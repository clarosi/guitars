import React, { Component } from 'react';

import { registerLoginRoute } from '../../shared/utils/routeConstants';
import { delay3sec } from '../../shared/utils/numberConstants';
import { signupEndPoint } from '../../shared/utils/endPointContants';
import { bindFormElementValue, generateDataToSubmit, verifyFormIsValid } from '../../shared/utils/helperFunctions';
import axios from '../../axios/axiosGuitars';
import FormElement from '../UI/FormElement/FormElement';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';

class Register extends Component {
    state = {
        isLoading: false,
        formHasError: false,
        formSuccess: false,
        formErrorMsg: '',
        formData: {
            firstname: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'firstname',
                    type: 'text',
                    placeholder: 'Enter your firstname.',
                    maxLength: 50
                },
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false,
                validationMsg: ''
            },
            lastname: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'lastname',
                    type: 'text',
                    placeholder: 'Enter your lastname.',
                    maxLength: 50
                },
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false,
                validationMsg: ''
            },
            email: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'email',
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
            password: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'password',
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
            },
            confirmPassword: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'confirmPassword',
                    type: 'password',
                    placeholder: 'Confirm your password.',
                    maxLength: 50
                },
                validation: {
                    required: true,
                    confirm: 'password'
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
            this.setState({
                isLoading: true,
                formErrorMsg: ''
            });
            axios.post(signupEndPoint, dataToSubmit)
            .then(res => {
                this.setState({
                    isLoading: false,
                    formHasError: false,
                    formSuccess: true
                });

                setTimeout(() => {
                    this.props.history.push(registerLoginRoute);
                }, delay3sec)
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    formHasError: true,
                    formErrorMsg: err.response.data.error
                });
            })
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
            formErrorMsg: '',
            formData: newFormData
        });
    }

    render() {
        return (
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <form onSubmit={(event) => this.submitFormHandler(event)}>
                                <h2>Personal Information</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormElement 
                                            id={this.state.formData.firstname.config.name}
                                            formData={this.state.formData.firstname}
                                            onChange={(element) => this.onChangeHandler(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormElement 
                                            id={this.state.formData.lastname.config.name}
                                            formData={this.state.formData.lastname}
                                            onChange={(element) => this.onChangeHandler(element)}
                                        />
                                    </div>
                                </div>
                                <div style={{width: '49%'}}>
                                    <FormElement 
                                        id={this.state.formData.email.config.name}
                                        formData={this.state.formData.email}
                                        onChange={(element) => this.onChangeHandler(element)}
                                    />
                                </div>
                                <h2>Verify Password</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormElement 
                                            id={this.state.formData.password.config.name}
                                            formData={this.state.formData.password}
                                            onChange={(element) => this.onChangeHandler(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormElement 
                                            id={this.state.formData.confirmPassword.config.name}
                                            formData={this.state.formData.confirmPassword}
                                            onChange={(element) => this.onChangeHandler(element)}
                                        />
                                    </div>
                                </div>
                                <div>
                                <Button 
                                    variant="outlined" 
                                    color="primary"
                                    onClick={(event) => this.submitFormHandler(event)}
                                >
                                    {this.state.isLoading ? <CircularProgress size={30} /> : 'Login'}
                                </Button>
                                {this.state.formHasError ?
                                    <div className="error_label">{this.state.formErrorMsg ? this.state.formErrorMsg : 'Please fill up all the required fields.'}</div>
                                    :
                                    null
                                }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>  
                <Dialog open={this.state.formSuccess}>
                    <div className="dialog_alert">
                        <div>Account successfully created.</div>
                        <div>
                            You will redirected to the Login page in a couple seconds...
                        </div>
                    </div>
                </Dialog>  
            </div>
        );
    }
}

export default Register