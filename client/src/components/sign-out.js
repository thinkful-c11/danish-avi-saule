import React from 'react';
import './css/sign-out.css';
//  ______________________
// |                      |
// |    SIGNOUT BUTTON    |
// |______________________|
// (\__/) ||
// (•ㅅ•) ||
// / 　 づ
export default function SignOut() {
    return (
        <div className="google-button">
                 <a className="fill-google-button" href={'/api/auth/logout'}> 
                <img className="google-logo" src="../../images/google-logo.png" alt="Google G Logo" /><span className="sign-out-word">Sign Out</span></a> 
        </div>);
}