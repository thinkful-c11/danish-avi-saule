import React from 'react';
import {connect} from 'react-redux';
import * as Cookies from 'js-cookie';
import Header from './header';
import SignOut from './sign-out';
import AppInfo from './app-info';
import QuestionPage from './question-page';
import GoogleSignIn from './google-sign-in';
import {getUser} from '../actions';

class App extends React.Component {

    componentDidMount() {
        // Job 4: Redux-ify all of the state and fetch calls to async actions.
        //DONE?
        const accessToken = Cookies.get('accessToken');
        console.log("Hi to my access token again",accessToken);
        if (accessToken) {
            this.props.dispatch(getUser(accessToken));
        }
    }
    render() {
        if (!this.props.currentUser) {
            return (
                <section className="login-page">
                    <Header />
                    <AppInfo />
                    <GoogleSignIn />
                </section>
            );
        }
        return (
            <section className="questions-page">
                <Header />
                <QuestionPage />
                <SignOut />
            </section>
        );
    }
}
const mapStateToProps=state=>({
    currentUser: state.currentUser,
});
export default connect(mapStateToProps)(App);