import React from 'react';
import './css/google-sign-in.css';
//  ______________________
// |                      |
// |    SIGN IN BUTTON    |
// |______________________|
// (\__/) ||
// (•ㅅ•) ||
// / 　 づ
export default function GoogleSignIn() {
    return (
        <div className="google-button">
                <a className="fill-google-button" href={'/api/auth/google'}><img className="google-logo" src="../../images/google-logo.png" alt="Google G logo"/>Register/Sign in</a>
        </div>);
}