import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getProductWoods, addProductWood } from '../../../../store/actions/';
import { 
    bindFormElementValue, 
    generateDataToSubmit, 
    verifyFormIsValid,
    resetFormField
} from '../../../../shared/utils/helperFunctions';
import { delay2sec } from '../../../../shared/utils/numberConstants';
import FormElement from '../../../UI/FormElement/FormElement';
import ErrorMsg from '../Misc/ErrorMsg';
import CircularProgress from '@material-ui/core/CircularProgress';

class ManageWoods extends Component {
    _isMounted = false;

    state = {
        isFetchingData: false,
        isSendingData: false,
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
                    placeholder: 'Enter wood name.',
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

    componentWillUnMount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this.setState({isFetchingData: true});
        this.props.dispatch(getProductWoods())
        .then(() => {
            this.setState({isFetchingData: false});
        })
        .catch(() => {
            this.setState({isFetchingData: false});
        });
    }

    resetFormFieldHandler = () => {
        const newFormData = resetFormField(this.state.formData);

        this.setState({formData: newFormData});
    }

    submitFormHandler = (event) => {
        const dataToSubmit = generateDataToSubmit(this.state.formData);
        const formIsValid = verifyFormIsValid(this.state.formData);

        if (formIsValid) { 
            this._isMounted = true;

            this.setState({
                isSendingData: true,
                isFetchingData: true
            });

            this.props.dispatch(addProductWood(dataToSubmit, this.props.productWoods))
            .then(res => {
                if (this._isMounted) {
                    if (res.payload.data.success) {
                        this.setState({
                            isSendingData: false,
                            isFetchingData: false,
                            formSuccessMsg: 'Wood successfully added.'
                        });
                        setTimeout(() => {
                            if (this._isMounted) {
                                this.setState({formSuccessMsg: ''});
                                this.resetFormFieldHandler();
                            }
                        }, delay2sec)
                    }
                    else {
                        this.setState({
                            isSendingData: false,
                            isFetchingData: false,
                            formHasError: true,
                            formErrorMsg: res.payload.data.error
                        }); 
                    }
                }
            })
            .catch(err => {
                if (this._isMounted) {
                    this.setState({
                        isSendingData: false,
                        isFetchingData: false,
                        formHasError: true
                    });
                }
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
            formErrorMsg: '',
            formData: newFormData
        });
    }

    renderCategoryItemHandler = () => (
        !this.state.isFetchingData ?
            this.props.productWoods.map(item => (
                <div
                    key={item._id}
                    className="category_item"
                >
                    {item.name}
                </div>
            ))
        :
        <CircularProgress style={{padding: '2rem 5rem'}} />
    )
    render() {
        const props = {
            formSuccessMsg: this.state.formSuccessMsg,
            formHasError: this.state.formHasError,
            formErrorMsg: this.state.formErrorMsg,
            submitFormHandler: this.submitFormHandler,
            formSubmitting: this.isSendingData,
            formType: 'Add Wood'
        };

        return (
            <div className="admin_category_wrapper">
                <h1>Woods</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.renderCategoryItemHandler()}
                        </div>
                    </div>
                    <div className="right">
                        <form onSubmit={(event) => this.submitFormHandler(event)}>
                            <FormElement 
                                id={this.state.formData.name.config.name}
                                formData={this.state.formData.name}
                                onChange={(element) => this.onChangeHandler(element)}
                            /> 
                        </form>
                        <ErrorMsg {...props} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        productWoods: state.product.productWoods
    };
};

export default connect(mapStateToProps)(ManageWoods);