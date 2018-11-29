import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as routes from '../../shared/utils/routeConstants';

const links = [
    {name: 'My Account', linkTo: routes.userDashboardRoute},
    {name: 'User Profile', linkTo: routes.userProfileRoute},
    {name: 'My Cart', linkTo: routes.userCartRoute}
];

const adminLinks = [
    {name: 'Site Info', linkTo: routes.adminSiteInfoRoute},
    {name: 'Add Products', linkTo: routes.adminAddProductRoute},
    {name: 'Manage Categories', linkTo: routes.adminManageCategoriesRoute}
];

const UserLayout = (props) => {
    const generateLinksHandler = (links) => (
        links.map((link, index) => (
            <Link
                key={index}
                to={link.linkTo}
            >
                {link.name}
            </Link>
        ))    
    );

    return (
        <div className="container">
            <div className="user_container">
                <div className="user_left_nav">
                    <h2>Dashboard</h2>
                    <div className="links">
                        {generateLinksHandler(links)}
                    </div>
                    {props.userData.isAdmin ?
                        <div>
                            <h2>Admin</h2>
                            <div className="links">
                                {generateLinksHandler(adminLinks)}
                            </div>
                        </div>
                        : null
                    }
                </div>
                <div className="user_right">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userData: state.userLogin.userData
    };
};

export default connect(mapStateToProps)(UserLayout);