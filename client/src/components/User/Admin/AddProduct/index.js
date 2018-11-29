import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getProductBrands, getProductWoods } from '../../../../store/actions/';
import { bindFormElementValue, generateDataToSubmit, verifyFormIsValid } from '../../../../shared/utils/helperFunctions';
import { frets } from '../../../../shared/utils/numberConstants';
import FormElement from '../../../UI/FormElement/FormElement';
import UserLayout from '../../../../hoc/Layout/UserLayout';

class AddProduct extends Component {
    state = {
        formHasError: false,
        formSuccessMsg: '',
        formData: {
            name: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Enter product name.',
                    label: 'Product',
                    maxLength: 50
                },
                validation: {
                    required: true
                },
                showLabel: true,
                isValid: false,
                isTouched: false,
                validationMsg: ''
            },
            description: {
                elementType: 'textarea',
                value: '',
                config: {
                    name: 'description',
                    type: 'textarea',
                    placeholder: 'Enter description.',
                    label: 'Description',
                    maxLength: 500
                },
                validation: {
                    required: true
                },
                showLabel: true,
                isValid: false,
                isTouched: false,
                validationMsg: ''
            },
            price: {
                elementType: 'input',
                value: '',
                config: {
                    name: 'price',
                    type: 'number',
                    placeholder: 'Enter price.',
                    label: 'Price',
                    maxLength: 7
                },
                validation: {
                    required: true
                },
                showLabel: true,
                isValid: false,
                isTouched: false,
                validationMsg: ''
            },
            brand: {
                elementType: 'select',
                value: '',
                config: {
                    name: 'brand',
                    label: 'Brand',
                    options: []
                },
                validation: {
                    required: true
                },
                showLabel: true,
                isValid: false,
                isTouched: false,
                validationMsg: ''
            },
            shipping: {
                elementType: 'select',
                value: '',
                config: {
                    name: 'shipping',
                    label: 'Shipping',
                    options: [
                        {value: true, displayValue: 'Yes'},
                        {value: false, displayValue: 'No'}
                    ]
                },
                validation: {
                    required: true
                },
                showLabel: true,
                isValid: false,
                isTouched: false,
                validationMsg: ''
            },
            available: {
                elementType: 'select',
                value: '',
                config: {
                    name: 'available',
                    label: 'Available',
                    options: [
                        {value: true, displayValue: 'Yes'},
                        {value: false, displayValue: 'No'}
                    ]
                },
                validation: {
                    required: true
                },
                showLabel: true,
                isValid: false,
                isTouched: false,
                validationMsg: ''
            },
            wood: {
                elementType: 'select',
                value: '',
                config: {
                    name: 'wood',
                    label: 'Wood',
                    options: []
                },
                validation: {
                    required: true
                },
                showLabel: true,
                isValid: false,
                isTouched: false,
                validationMsg: ''
            },
            frets: {
                elementType: 'select',
                value: '',
                config: {
                    name: 'frets',
                    label: 'Frets',
                    options: [
                        {value: frets[0]._id, displayValue: frets[0].name},
                        {value: frets[1]._id, displayValue: frets[1].name},
                        {value: frets[2]._id, displayValue: frets[2].name},
                        {value: frets[3]._id, displayValue: frets[3].name}
                    ]
                },
                validation: {
                    required: true
                },
                showLabel: true,
                isValid: false,
                isTouched: false,
                validationMsg: ''
            },
            publish: {
                elementType: 'select',
                value: '',
                config: {
                    name: 'publish',
                    label: 'Publish',
                    options: [
                        {value: true, displayValue: 'Yes'},
                        {value: false, displayValue: 'No'}
                    ]
                },
                validation: {
                    required: true
                },
                showLabel: true,
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
            // const credentials = {
            //     email: dataToSubmit.txtEmail,
            //     password: dataToSubmit.txtPassword
            // };

            // this.props.onLoginUser(credentials)       
        }
        else {
            //this.setState({formHasError: true});
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
            <UserLayout>
                <div>
                    <h1>Add Product</h1>
                    <form onSubmit={(event) => this.submitFormHandler(event)}>
                        <FormElement 
                            id={this.state.formData.name.config.name}
                            formData={this.state.formData.name}
                            onChange={(element) => this.onChangeHandler(element)}
                        />
                    </form>
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        productBrands: state.product.productBrands,
        productWoods: state.product.productWoods
    };
};

export default connect(mapStateToProps)(AddProduct);