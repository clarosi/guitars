import React from 'react';

import { registerRoute } from '../../shared/utils/routeConstants';
import CustomButton from '../UI/CustomButton/';
import Login from './Login';

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h2>New Customers</h2>
                        <p>
                            Create a new account.<br />
                            It’s free and always will be.
                        </p>
                        <CustomButton 
                            type="link"
                            linkTo={registerRoute}
                            title="Create an account"
                            addStyles={{margin: '10px 0 0 0'}}
                        />
                    </div>
                    <div className="right">
                        <h2>Registered Customers</h2>
                        <p>If you have an account please login.</p>
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterLogin;