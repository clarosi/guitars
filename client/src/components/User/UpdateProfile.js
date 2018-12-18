import React, { Component } from 'react';

import { connect } from 'react-redux';
import { updateUserProfile, clearUserProfile } from '../../store/actions/';
import { 
    bindFormElementValue, 
    generateDataToSubmit, 
    verifyFormIsValid,
    populateFields
} from '../../shared/utils/helperFunctions';
import { delay2sec } from '../../shared/utils/numberConstants';
import FormElement from '../UI/FormElement/FormElement';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class UpdateProfile extends Component {
    _isMounted = false;

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

    componentWillUnmount() {
        this._isMounted = false;
    }

    submitFormHandler = (event) => {
        const dataToSubmit = generateDataToSubmit(this.state.formData);
        const formIsValid = verifyFormIsValid(this.state.formData);

        if (formIsValid) {
            this._isMounted = true;
            this.setState({isLoading: true})
            this.props.dispatch(updateUserProfile(dataToSubmit)).then((res) => {
                if (this.props.updateUser) {
                    if (this._isMounted) {
                        this.setState({formSuccess: true, isLoading: false}, () => {                          
                            setTimeout(() => {
                                if (this._isMounted) {
                                    this.props.dispatch(clearUserProfile());
                                    this.setState({formSuccess: false});
                                }
                            }, delay2sec);                         
                        });
                    }
                }
                else {
                    this.setState({
                        isLoading: false,
                        formHasError: true,
                        formErrorMsg: res.payload.data.error
                    });
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    formHasError: true
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
            formSuccess: false,
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
                    {this.state.formSuccess ?
                        <div style={{marginTop: '15px', color: '#32CD32'}}>Update success.</div>
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
        userData: state.user.userData,
        updateUser: state.user.updateUser
    }
}

export default connect(mapStateToProps)(UpdateProfile);