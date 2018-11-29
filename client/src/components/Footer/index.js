import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

const Footer = () => {
    const footerDetails = [
        {icon: faCompass, name: 'Address', value: 'Pinayagan Norte, Tubigon, Bohol'},
        {icon: faPhone, name: 'Phone', value: '09061456801'},
        {icon: faClock, name: 'Working Hours', value: 'Mon-Sat 9am-10pm'},
        {icon: faEnvelope, name: 'Email', value: 'clarosian@yahoo.com'}
    ];

    return (
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">
                    GUITARS
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact Information</h2>
                        <div className="business_nfo">
                            {footerDetails.map((details, index) => (              
                                <div 
                                    className="tag"
                                    key={index}
                                >
                                    <FontAwesomeIcon 
                                        icon={details.icon}
                                        className="icon"
                                    />
                                    <div className="nfo">
                                        <div>{details.name}</div>
                                        <div>{details.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="left">
                        <h2>Be the first to know</h2>
                        <div>
                            <span>Get all the information on events, sales and offers. You can miss out.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;