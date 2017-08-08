import React from 'react';
import * as Cookies from 'js-cookie';
import Header from './header';
import SignOut from './sign-out';
import AppInfo from './app-info';
import QuestionPage from './question-page';
import GoogleSignIn from './google-sign-in';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        // Job 4: Redux-ify all of the state and fetch calls to async actions.
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            fetch('/api/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                if (!res.ok) {
                    if (res.status === 401) {
                        // Unauthorized, clear the cookie and go to
                        // the login page
                        Cookies.remove('accessToken');
                        return;
                    }
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then(currentUser =>
                this.setState({
                    currentUser
                })
            );
        }
    }

    render() {
        if (!this.state.currentUser) {
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
                <SignOut />
                <QuestionPage />
            </section>
        );
    }
}

export default App;
