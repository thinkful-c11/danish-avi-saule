const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');

mongoose.Promise = global.Promise;

require ('dotenv').config();
const {DATABASE_URL, PORT} = process.env;
const {Question, User} = require('./models');

let secret = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
};
if(process.env.NODE_ENV != 'production') {
    secret = require('./secret');
}

const app = express();

app.use(passport.initialize());
app.use(bodyParser.json());

app.get('/api/users/:accessToken',  (req, res) => {
    User
    .findOne({accessToken: req.params.accessToken})
    .then(user =>{
        return res.json(user);
    })
    .catch(err => {
        res.status(500).json({error: 'Something went wrong!!!'});
    });
});

passport.use(
    new GoogleStrategy({
        clientID:  secret.CLIENT_ID,
        clientSecret: secret.CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
        User.find({googleId:profile.id}, function(err,users){
            if (!users.length){
                User.create({
                    googleId: profile.id,
                    name:profile.displayName,
                    accessToken: accessToken
                }, function(err,user){
                    return cb(null, user);
                });
            } else {
                return cb(null,users[0]);
            }
        });
    }
    ));

passport.use(
    new BearerStrategy(
        (token, done) => {
            User.findOne({accessToken: token}, function(err, user){
                if (err) {done(err);}
                if(!user) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    )
);

app.get('/api/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

app.get('/api/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.redirect('/');
    }
);

app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

app.get('/api/me',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
        return res.json({
            hello:'it worked!',
            googleId: req.user.googleId
        })
    }
);

app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
        Question
        .find()
        .then(questions =>{
            return res.json(questions.map(question =>question.apiRepr()));
        })
        .catch(err => {
            res.status(500).json({error: 'Something went wrong!!!'});
        });
    });


// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL,function(err){
            if(err) {
                return reject(err);
            }
        });
        server = app.listen(port, () => {
            resolve();
        }).on('error', err=>{
            mongoose.disconnect();
            return reject(err);
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
