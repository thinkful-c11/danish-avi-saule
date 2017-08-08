import React from 'react';
import './sign-out.css';

export default function SignOut() {
    return <div className="google-button"><a className="fill-google-button" href={'/api/auth/google'}><img className="google-logo" src="../../images/google-logo.png" alt="Google G Logo" />Sign Out</a></div>;
}