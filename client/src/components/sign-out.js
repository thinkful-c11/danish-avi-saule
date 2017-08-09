import React from 'react';
import './sign-out.css';

export default function SignOut() {
    return (
        <div className="google-button">
            <button className="button-google">
                <a className="fill-google-button" href={'/api/auth/logout'}><img className="google-logo" src="../../images/google-logo.png" alt="Google G Logo" />Sign Out</a>
            </button>
        </div>);
}