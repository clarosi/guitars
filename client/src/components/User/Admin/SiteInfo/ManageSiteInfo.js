import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getSiteInfo, updateSiteInfo } from '../../../../store/actions/';
import { 
    bindFormElementValue, 
    generateDataToSubmit, 
    verifyFormIsValid,
    populateFields
} from '../../../../shared/utils/helperFunctions';
import { delay2sec } from '../../../../shared/utils/numberConstants';
import ErrorMsg from '../Misc/ErrorMsg';
import FormElement from '../../../UI/FormElement/FormElement';
import LinearProgress from '@material-ui/core/LinearProgress';

class ManageSiteInfo extends Component {
    _isMounted = false;

    state = {
        isLoading: false,
        formHasError: false,
        formSuccess: false,
        formSuccessMsg: '',
        formErrorMsg: '',
        formData: {
            address: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'address',
                    type: 'text',
                    placeholder: 'Enter address.',
                    label: 'Address',
                    maxLength: 50
                },
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false,
                showLabel: true,
                validationMsg: ''
            },
            hours: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'hours',
                    type: 'text',
                    placeholder: 'Enter working hours.',
                    label: 'Working Hours',
                    maxLength: 50
                },
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false,
                showLabel: true,
                validationMsg: ''
            },
            phone: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'phone',
                    type: 'text',
                    placeholder: 'Enter phone number.',
                    label: 'Phone',
                    maxLength: 50
                },
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false,
                showLabel: true,
                validationMsg: ''
            },
            email: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Enter email.',
                    label: 'Email',
                    maxLength: 50
                },
                validation: {
                    required: true,
                    isValidEmail: true
                },
                isValid: false,
                isTouched: false,
                showLabel: true,
                validationMsg: ''
            }
        }
    };

    componentDidMount() {
        this._isMounted = true;

        this.setState({isLoading: true});

        this.props.dispatch(getSiteInfo())
        .then(() => {
            const newFormData = populateFields(this.state.formData, this.props.siteData.siteInfo[0]);

            if (this._isMounted) this.setState({
                formData: newFormData,
                isLoading: false
            });
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    submitFormHandler = (event) => {
        const dataToSubmit = generateDataToSubmit(this.state.formData);
        const formIsValid = verifyFormIsValid(this.state.formData);

        if (formIsValid) {
            this._isMounted = true; 
            this.props.dispatch(updateSiteInfo(dataToSubmit))
            .then(() => {
                if (this._isMounted) {
                    this.setState({formSuccessMsg: 'Update success.'}, () => {
                        setTimeout(() => {
                            if (this._isMounted) this.setState({formSuccessMsg: ''});
                        }, delay2sec)
                    });
                }
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
            formSuccess: false,
            formSuccessMsg: '',
            formErrorMsg: '',
            formData: newFormData
        });
    }

    render() {
        const props = {
            formSuccessMsg: this.state.formSuccessMsg,
            formHasError: this.state.formHasError,
            formErrorMsg: this.state.formErrorMsg,
            submitFormHandler: this.submitFormHandler,
            formSubmitting: this.isLoading,
            formType: 'Update Info'
        };

        return (
            <div>
                {!this.state.isLoading ?
                    <React.Fragment>
                        <form onSubmit={(event) => this.submitFormHandler(event)}>
                            <h1>Site Info</h1>
                            <FormElement 
                                id={this.state.formData.address.config.name}
                                formData={this.state.formData.address}
                                onChange={(element) => this.onChangeHandler(element)}
                            />
                            <FormElement 
                                id={this.state.formData.hours.config.name}
                                formData={this.state.formData.hours}
                                onChange={(element) => this.onChangeHandler(element)}
                            />
                            <FormElement 
                                id={this.state.formData.phone.config.name}
                                formData={this.state.formData.phone}
                                onChange={(element) => this.onChangeHandler(element)}
                            />
                            <FormElement 
                                id={this.state.formData.email.config.name}
                                formData={this.state.formData.email}
                                onChange={(element) => this.onChangeHandler(element)}
                            />
                        </form>
                        <ErrorMsg {...props} />
                    </React.Fragment> 
                    : <LinearProgress />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        siteData : state.site.siteData
    }
}

export default connect(mapStateToProps)(ManageSiteInfo);