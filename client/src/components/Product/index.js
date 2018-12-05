import React, { Component } from 'react';

import { connect } from 'react-redux';
import { 
    getProductDetails, 
    clearProductDetails,
    addToCartUser 
} from '../../store/actions/';
import ProductInfo from './ProductInfo';
import ProductImage from './ProductImage';
import PageTop from '../UI/PageTop/';
import CustomizedSnackbars from '../UI/SnackBars/';
import { delay3sec } from '../../shared/utils/numberConstants'
import LinearProgress from '@material-ui/core/LinearProgress';

class ProductDetails extends Component {
    state = {
        showSnackbar: false
    };

    componentWillUnmount() {
        this.props.dispatch(clearProductDetails());
    }

    componentDidMount() {
        const productId = this.props.match.params.productId;

        this.props.dispatch(getProductDetails(productId))
        .then(() => {
            if (this.props.productDetails.length === 0) {
                this.props.history.push('/');
            }
        });
    }

    addToCartHandler = (id) => {
        this.props.dispatch(addToCartUser(id))
        .then(res => {
            this.setState({showSnackbar: true});
            setTimeout(() => {
                this.setState({showSnackbar: false});
            }, delay3sec)
        });
    }

    render() {
        const customizedSnackbars = (
            <CustomizedSnackbars
                open={this.state.showSnackbar}
                vertical="top"
                horizontal="right"
                variant="success"
                message="Item successfully added to cart."
            />
        );

        return (
            <div>
                <PageTop title="Product Details" />
                <div className="container">
                    {this.props.productDetails.length > 0 ?
                        <div className="product_detail_wrapper">
                            <div className="left">
                                <div style={{width: '400px'}}>
                                    <ProductImage details={this.props.productDetails} />
                                </div>
                            </div>
                            <div className="right">
                                <ProductInfo
                                    addToCart={(id) => this.addToCartHandler(id)}
                                    details={this.props.productDetails}
                                />
                            </div>
                        </div>
                        :
                        <LinearProgress />
                    }
                </div>
                {customizedSnackbars}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        productDetails: state.product.productDetails
    };
}

export default connect(mapStateToProps)(ProductDetails);