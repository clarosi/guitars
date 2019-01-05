import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

const Footer = (props) => {
    //props.siteInfo.address
    const footerDetails = [
        {icon: faCompass, name: 'Address', value: props.siteInfo[0].address},
        {icon: faPhone, name: 'Phone', value: props.siteInfo[0].phone},
        {icon: faClock, name: 'Working Hours', value: props.siteInfo[0].hours},
        {icon: faEnvelope, name: 'Email', value: props.siteInfo[0].email}
    ];

    return (
        <div className="row">
            <div className="col-sm-12">
                <footer className="bck_b_light">
                    <div className="row container">
                        <div className="col-sm-12 logo">
                            GUITARS
                        </div>
                        <div className="row mt-4">
                            <div className="col-sm-6">
                                <div className="row business_nfo pl-3">
                                    <h2 className="mb-4">Contact Information</h2>
                                    {footerDetails.map((details, index) => (              
                                        <div 
                                            className="col-sm-12 tag"
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
                            <div className="col-md-6">
                                <h2 className="mb-4">Be the first to know</h2>
                                <div>
                                    <span>Get all the information on events, sales and offers. You can miss out.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Footer;