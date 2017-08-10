import React from 'react';
import './sign-out.css';

export default function SignOut() {
    return (
        <div className="google-button">
             <button className="button-google" onclick="window.location.href='/api/auth/logout'"> 
                {/* <a className="fill-google-button" href={'/api/auth/logout'}> */}
                <img className="google-logo" src="../../images/google-logo.png" alt="Google G Logo" /><span class="sign-out-word">Sign Out</span>
                {/* Sign Out</a> */}
             </button> 
        </div>);
}