import React, { Component } from 'react';

import * as actions from '../../store/actions/';
import { userDashboardRoute } from '../../shared/utils/routeConstants';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { bindFormElementValue, generateDataToSubmit, verifyFormIsValid } from '../../shared/utils/helperFunctions';
import FormElement from '../UI/FormElement/FormElement';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class Login extends Component {
    state = {
        formHasError: false,
        formSuccessMsg: '',
        formData: {
            txtEmail: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'txtEmail',
                    type: 'email',
                    placeholder: 'Enter your email.',
                    maxLength: 50
                },
                validation: {
                    required: true,
                    isValidEmail: true
                },
                isValid: false,
                isTouched: false,
                validationMsg: ''
            },
            txtPassword: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'txtPassword',
                    type: 'password',
                    placeholder: 'Enter your password.',
                    maxLength: 50
                },
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false,
                validationMsg: ''
            }
        }
    };

    submitFormHandler = (event) => {
        const dataToSubmit = generateDataToSubmit(this.state.formData);
        const formIsValid = verifyFormIsValid(this.state.formData);

        if (formIsValid) {
            const credentials = {
                email: dataToSubmit.txtEmail,
                password: dataToSubmit.txtPassword
            };

            this.props.onLoginUser(credentials)       
        }
        else {
            this.setState({formHasError: true});
        }
    }

    onChangeHandler = (element) => {
        const newFormData = bindFormElementValue(element, this.state.formData);

        this.setState({
            formHasError: false,
            formSuccessMsg: '',
            formData: newFormData
        });
    }

    render() {
        let redirect = null;
        if (this.props.userData) {
            if (this.props.userData.isAuth)
                redirect = <Redirect to={userDashboardRoute} />;
        }

        return (
            <div className="signin_wrapper">
                {redirect}
                <form onSubmit={(event) => this.submitFormHandler(event)}>
                    <FormElement 
                        id={this.state.formData.txtEmail.config.name}
                        formData={this.state.formData.txtEmail}
                        onChange={(element) => this.onChangeHandler(element)}
                    />
                    <FormElement 
                        id={this.state.formData.txtPassword.config.name}
                        formData={this.state.formData.txtPassword}
                        onChange={(element) => this.onChangeHandler(element)}
                    />
                    <Button 
                        variant="outlined" 
                        color="primary"
                        onClick={(event) => this.submitFormHandler(event)}
                    >
                        {this.props.isLoading ? <CircularProgress size={30} /> : 'Login'}
                    </Button>
                    {this.state.formHasError || this.props.error ?
                        <div className="error_label">Invalid email or password, please try again.</div>
                        :
                        null
                    }
                </form>   
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoginUser: (credentials) => dispatch(actions.loginUser(credentials))
    };
};

const mapStateToProps = state => {
    return {   
        userData: state.userLogin.userData,
        isLoading: state.userLogin.isLoading,
        error: state.userLogin.error
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));