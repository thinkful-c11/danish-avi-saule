const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');

require ('dotenv').config();
const {DATABASE_URL, PORT} = process.env;
const {Question, User} = require('./models');

//const {DATABASE_URL, PORT} = require('./config');

mongoose.connect(DATABASE_URL,function(err){
    if(err) console.log('Something wrong with mongoose connection');
    console.log('MLab connected!');
});
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


//here go the api endpoints for db...

app.get('/api/questions', passport.authenticate('bearer', {session: false}), (req, res) => {
    Question
    .find()
    .then(questions =>{
        return res.json(questions.map(question => question.apiRepr()));
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'Something went wrong!!!'});
    });
});

app.get('/api/users/:accessToken',  (req, res) => {
    User
    .findOne({accessToken: req.params.accessToken})
    .then(user =>{
        console.log(user);
        return res.json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'Something went wrong!!!'});
    });
});



passport.use(
    new GoogleStrategy({
        clientID:  secret.CLIENT_ID,
        clientSecret: secret.CLIENT_SECRET,
        callbackURL: `/api/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
        User.find({googleId:profile.id}, function(err,user){
            if (!user.length){
                User.create({
                    googleId: profile.id,
                    accessToken: accessToken,
                    name:profile.displayName
                }, function(err,user){
                    return cb(null, user);
                });
            } else {
                return cb(null,user);
            }
        });
    }
    ));

        // Job 1: Set up Mongo/Mongoose, create a User model which store the
        // google id, and the access token
        // Job 2: Update this callback to either update or create the user
        // so it contains the correct access token


passport.use(
    new BearerStrategy(
        (token, done) => {
            User.find({accessToken: token}, function(err, user){
                if(!user.length) {
                    return done(null, false);
                }
            // Job 3: Update this callback to try to find a user with a
            // matching access token.  If they exist, let em in, if not,
            // don't.
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
    (req, res) => res.json({
        googleId: req.user.googleId
    })
);

app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json(['Question 1', 'Question 2'])
);

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
        console.log("Starting server on port", port);
        server = app.listen(port, () => {
            console.log("Server listening on port", port);
            resolve();
        }).on('error', reject);
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
