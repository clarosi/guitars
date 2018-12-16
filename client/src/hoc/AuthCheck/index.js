import React, { Component } from 'react';

import { connect } from 'react-redux';
import { authUser } from '../../store/actions/';
import { registerLoginRoute, userDashboardRoute } from '../../shared/utils/routeConstants';
import { tokenName } from '../../shared/utils/stringConstants';
import CircularProgress from '@material-ui/core/CircularProgress';

export default (WrappedComponent, isProtected, isAdminRoute = null) => {
    class AuthenticationCheck extends Component {
        state = {
            isLoading: true
        };

        componentDidMount() {
            if (isProtected) {
                this.props.dispatch(authUser())
                .then(res => {
                    const userData = this.props.userData;

                    if (!userData.isAuth) {
                        if (isProtected) return this.props.history.push(registerLoginRoute);
                    }
                    else {
                        if (isAdminRoute && !userData.user.isAdmin) {
                            if (isProtected === false) return this.props.history.push(userDashboardRoute);
                        }
                        else {
                            if (isProtected === false) return this.props.history.push(userDashboardRoute);
                        }
                    }

                    this.setState({isLoading: false});
                })
                .catch(err => {
                    //should not happen
                    console.log('this should not happen...');
                });
            }
            else {
                const token = localStorage.getItem(tokenName);
                if (token) {
                    this.props.dispatch(authUser())
                    .then((res) => {
                        if (typeof res.payload === 'string')
                            localStorage.removeItem(tokenName);
                    });
                }
                this.setState({isLoading: false});
            }
                  
        }

        render() {
            if (this.state.isLoading) {
                return (
                    <div className="main_loader">
                        <CircularProgress />
                    </div>
                );
            }

            return <WrappedComponent {...this.props} userData={this.props.userData} />;
        }
    }

    const mapStateToProps = state => {
        return {
            userData: state.user.userData
        };
    };
    
    return connect(mapStateToProps)(AuthenticationCheck);
}