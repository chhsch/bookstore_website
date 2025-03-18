import '../assets/css/AppFooter.css'
import '../assets/css/global.css'
import Twitter from '../assets/images/site/twitter.png';
import FB from '../assets/images/site/facebook.png';
import Email from '../assets/images/site/email.png';
import Pin from '../assets/images/site/pinterest.png';
import React from 'react';

// Defines a React Functional Component named AppFooter
const AppFooter: React.FC = () => {
    return (
        <footer className="footer">
            {/* Follow us Section on the left */}
            <div className="follow-us">
                <h3>Follow Us</h3>
                <div className="icon-container">
                    <img className="social-icons" src={Twitter} alt="Twitter" width="50" height="50"/>
                    <img className="social-icons" src={FB} alt="Facebook" width="50" height="50"/>
                    <img className="social-icons" src={Pin} alt="Pinterest" width="50" height="50"/>
                </div>
            </div>
            {/* Contact Us Section in the middle */}
            <div className="contact-us">
                <h3>Contact Us</h3>
                <div className="icon-container">
                    <img className="mail-icons" src={Email} alt="Email" width="50" height="50"/>
                </div>
                <p>Copyright 2023 Leafink. All rights reserved.</p>
            </div>
            {/* Account Section on the right */}
            <div className="account">
                <h3>Account</h3>
                <p>Log in/ Create</p>
                <p>Wishlist</p>
            </div>
        </footer>
    );
};

export default AppFooter;

