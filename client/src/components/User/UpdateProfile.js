import React, { Component } from 'react';

import { connect } from 'react-redux';
import { 
    bindFormElementValue, 
    generateDataToSubmit, 
    verifyFormIsValid,
    populateFields
} from '../../shared/utils/helperFunctions';
import FormElement from '../UI/FormElement/FormElement';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class UpdateProfile extends Component {
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
            }
        }
    };

    componentDidMount() {
        const newFormData = populateFields(this.state.formData, this.props.userData.user);

        this.setState({formData: newFormData});
    }

    submitFormHandler = (event) => {
        const dataToSubmit = generateDataToSubmit(this.state.formData);
        const formIsValid = verifyFormIsValid(this.state.formData);

        if (formIsValid) {
            console.log(dataToSubmit);          
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
            <div>
                <form onSubmit={(event) => this.submitFormHandler(event)}>
                    <h3>Personal Information</h3>
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
                    <Button 
                        variant="outlined" 
                        color="primary"
                        onClick={(event) => this.submitFormHandler(event)}
                    >
                        {this.state.isLoading ? <CircularProgress size={30} /> : 'Update'}
                    </Button>
                    {this.state.formHasError ?
                        <div className="error_label">{this.state.formErrorMsg ? this.state.formErrorMsg : 'Please fill up all the required fields.'}</div>
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
        userData: state.user.userData
    }
}

export default connect(mapStateToProps)(UpdateProfile);