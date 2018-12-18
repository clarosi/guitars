import React, { Component } from 'react';

import { connect } from 'react-redux';
import { 
    getProductBrands, 
    getProductWoods,  
    addProduct,
    clearProduct
} from '../../../../store/actions/';
import { 
    bindFormElementValue, 
    generateDataToSubmit, 
    verifyFormIsValid,
    populateOptionFields,
    resetFormField 
} from '../../../../shared/utils/helperFunctions';
import { delay3sec } from '../../../../shared/utils/numberConstants';
import { frets } from '../../../../shared/utils/numberConstants';
import FormElement from '../../../UI/FormElement/FormElement';
import UserLayout from '../../../../hoc/Layout/UserLayout';
import ErrorMsg from '../Misc/ErrorMsg';
import FileUploader from '../../../UI/FormElement/FileUploader';

class AddProduct extends Component {
    _isMounted = false;

    state = {
        isLoading: false,
        formHasError: false,
        formErrorMsg: '',
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
            },
            images: {
                value: [],
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false,
                validationMsg: ''
            }
        }
    };

    componentDidMount() {
        const formData = this.state.formData;

        this.props.dispatch(getProductBrands())
        .then(res => {
            const newFormData = populateOptionFields(formData, this.props.productBrands, 'brand');
            this.updateFieldsHandler(newFormData);
        });

        this.props.dispatch(getProductWoods())
        .then(res => {
            const newFormData = populateOptionFields(formData, this.props.productWoods, 'wood');
            this.updateFieldsHandler(newFormData);
        })
    }

    componentWillUnMount() {
        this._isMounted = false;
        this.props.dispatch(clearProduct());
    }

    updateFieldsHandler = (newFormData) => {
        this.setState({formData: newFormData});
    }

    resetFormFieldHandler = () => {
        const newFormData = resetFormField(this.state.formData);

        this.setState({
            formData: newFormData,
            isLoading: false,
            formErrorMsg: '',
            formSuccessMsg: 'Product successfully added.'
        });

        setTimeout(() => {
            this.setState({formSuccessMsg: ''});
            this.props.dispatch(clearProduct());
        }, delay3sec);
    }

    submitFormHandler = (event) => {
        const dataToSubmit = generateDataToSubmit(this.state.formData);
        const formIsValid = verifyFormIsValid(this.state.formData);

        if (formIsValid) { 
            this._isMounted = true;

            this.setState({isLoading: true});

            this.props.dispatch(addProduct(dataToSubmit))
            .then((res) => {
                if (this._isMounted) {
                    if (res.payload.data.success) {
                        this.resetFormFieldHandler();
                    }
                    else {
                        this.setState({
                            isLoading: false,
                            formHasError: true,
                            formErrorMsg: res.payload.data.error,
                            formSuccessMsg: ''
                        });  
                    }
                }
            })
            .catch(() => {
                if (this._isMounted) {
                    this.setState({
                        isLoading: false,
                        formHasError: true,
                        formErrorMsg: '',
                        formSuccessMsg: ''
                    });
                }
            });
        }
        else {
            this.setState({formHasError: true});
        }
    }

    imagesHandler = (images) => {
        const newFormData = Object.assign({}, this.state.formData);
        newFormData['images'].value = images;
        newFormData['images'].isValid = true;

        this.setState({formData: newFormData});
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
        const props = {
            formSuccessMsg: this.state.formSuccessMsg,
            formHasError: this.state.formHasError,
            formErrorMsg: this.state.formErrorMsg,
            submitFormHandler: this.submitFormHandler,
            formSubmitting: this.isLoading,
            formType: 'Add Product'
        };

        return (
            <UserLayout>
                <div>
                    <h1>Add Product</h1>
                    <form onSubmit={(event) => this.submitFormHandler(event)}>
                        <FileUploader
                            imagesHandler={(images) => this.imagesHandler(images)}
                            reset={this.state.formSuccessMsg}
                        />
                        <FormElement 
                            id={this.state.formData.name.config.name}
                            formData={this.state.formData.name}
                            onChange={(element) => this.onChangeHandler(element)}
                        />    
                        <FormElement 
                            id={this.state.formData.description.config.name}
                            formData={this.state.formData.description}
                            onChange={(element) => this.onChangeHandler(element)}
                        />
                        <FormElement 
                            id={this.state.formData.price.config.name}
                            formData={this.state.formData.price}
                            onChange={(element) => this.onChangeHandler(element)}
                        />
                        <div className="form_devider"></div>
                        <FormElement 
                            id={this.state.formData.brand.config.name}
                            formData={this.state.formData.brand}
                            onChange={(element) => this.onChangeHandler(element)}
                        />
                        <FormElement 
                            id={this.state.formData.shipping.config.name}
                            formData={this.state.formData.shipping}
                            onChange={(element) => this.onChangeHandler(element)}
                        />
                        <FormElement 
                            id={this.state.formData.available.config.name}
                            formData={this.state.formData.available}
                            onChange={(element) => this.onChangeHandler(element)}
                        />
                        <div className="form_devider"></div>
                        <FormElement 
                            id={this.state.formData.wood.config.name}
                            formData={this.state.formData.wood}
                            onChange={(element) => this.onChangeHandler(element)}
                        />
                        <FormElement 
                            id={this.state.formData.frets.config.name}
                            formData={this.state.formData.frets}
                            onChange={(element) => this.onChangeHandler(element)}
                        />
                        <FormElement 
                            id={this.state.formData.publish.config.name}
                            formData={this.state.formData.publish}
                            onChange={(element) => this.onChangeHandler(element)}
                        />
                    </form>
                    <ErrorMsg {...props} />
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