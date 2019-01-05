import React, { Component } from 'react';

import { connect } from 'react-redux';
import { clearUserStore } from '../../store/actions';
import { Link, withRouter } from 'react-router-dom';
import { tokenName } from '../../shared/utils/stringConstants';
import * as routes from '../../shared/utils/routeConstants';

class Header extends Component {
    state = {
        page: [
            {_id: 1, name: 'Home', linkTo: '/', public: true},
            {_id: 2, name: 'Guitars', linkTo: routes.shopRoute, public: true}
        ],
        user: [
            {_id: 3, name: 'My Cart', linkTo: routes.userCartRoute, public: false},
            {_id: 4, name: 'My Account', linkTo: routes.userDashboardRoute, public: false},
            {_id: 5, name: 'Sign up / Sign in', linkTo: routes.registerLoginRoute, public: true},
            {_id: 6, name: 'Log out', linkTo: routes.userLogoutRoute, public: false}
        ]
    };

    showLinksHandler = (types) => {
        let list = [];

        if (this.props.userData) {
            types.forEach(item => {
                if (!this.props.userData.isAuth) {
                    if (item.public) list.push(item)
                }
                else {
                    if (item._id !== 5) list.push(item)
                }
            })
        }

        return list.map(item => {
            if (item._id !== 3) 
                return this.defaultLinkHandler(item);
            else
                return this.cartLinkHandler(item);
        })
    }

    defaultLinkHandler = (item) => (
        item._id === 6 ?
            <div 
                key={item._id}
                className="log_out_link"
                onClick={this.logoutHandler}
            >
                {item.name}
            </div>
            :
            <Link
                key={item._id}
                to={item.linkTo}
            >
                {item.name}
            </Link>
    )

    cartLinkHandler = (item) => {
        return (
            <div
                key={item._id}
                className="cart_link"
            >
                <span>{this.props.userData.user.cart ? this.props.userData.user.cart.length : 0}</span>
                <Link to={item.linkTo}>
                    {item.name}
                </Link>
            </div>
        );
    }

    logoutHandler = () => {
        localStorage.removeItem(tokenName);
        this.props.dispatch(clearUserStore());
        this.props.history.push(routes.registerLoginRoute);
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <header className="bck_b_light">
                        <div className="row container">
                            <div className="col-sm-6 left">
                                <div className="logo">
                                    <Link to={'/'}>GUITARS</Link>
                                </div>
                            </div>
                            <div className="col-xs-6 right">
                                <div className="top">
                                    {this.showLinksHandler(this.state.user)}
                                </div>
                                <div className="bottom">
                                    {this.showLinksHandler(this.state.page)}
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.user.userData
    };
};

export default connect(mapStateToProps, null)(withRouter(Header));