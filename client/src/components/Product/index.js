import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getProductDetails, clearProductDetails } from '../../store/actions/';
import ProductInfo from './ProductInfo';
import ProductImage from './ProductImage';
import PageTop from '../UI/PageTop/';
import LinearProgress from '@material-ui/core/LinearProgress';

class ProductDetails extends Component {

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

    addToCartHandler = (_id) => {

    }

    render() {
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
                                    addToCart={(_id) => this.addToCartHandler(_id)}
                                    details={this.props.productDetails}
                                />
                            </div>
                        </div>
                        :
                        <LinearProgress />
                    }
                </div>
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