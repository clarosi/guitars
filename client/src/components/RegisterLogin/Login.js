import React, { Component } from 'react';

import { loginUser } from '../../store/actions/';
import { userDashboardRoute } from '../../shared/utils/routeConstants';
import { tokenName } from '../../shared/utils/stringConstants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindFormElementValue, generateDataToSubmit, verifyFormIsValid } from '../../shared/utils/helperFunctions';
import FormElement from '../UI/FormElement/FormElement';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class Login extends Component {
    state = {
        isLoading: false,
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
            this.setState({isLoading: true});
            const credentials = {
                email: dataToSubmit.txtEmail,
                password: dataToSubmit.txtPassword
            };

            this.props.dispatch(loginUser(credentials))
            .then(res => { 
                if (res.payload.data.isAuth) {
                    localStorage.setItem(tokenName, res.payload.data.user.token);
                    this.props.history.push(userDashboardRoute.toString());
                }
                else {
                    this.setState({
                        formHasError: true,
                        isLoading: false
                    });
                } 
            })
            .catch(() => {
                this.setState({
                    formHasError: true,
                    isLoading: false
                });
            });
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
        return (
            <div className="signin_wrapper">
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
                        {this.state.isLoading ? <CircularProgress size={30} /> : 'Login'}
                    </Button>
                    {this.state.formHasError ?
                        <div className="error_label">Invalid email or password, please try again.</div>
                        :
                        null
                    }
                </form>   
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userLogin.userData
    };
};

export default connect(mapStateToProps)(withRouter(Login));