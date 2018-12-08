import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getCartItemUser, removeCartItem } from '../../store/actions/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserLayout from '../../hoc/Layout/UserLayout';
import ProductBlock from '../UI/ProductBlock/';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import LinearProgress from '@material-ui/core/LinearProgress';

class UserCart extends Component {
    state = {
        loading: false,
        total: 0,
        showTotal: false,
        showSuccess: false
    };

    componentDidMount() {
        const cartItems = [];
        const { userData } = this.props;

        if (userData.user.cart.length > 0) {
            this.setState({loading: true});

            userData.user.cart.forEach(item => {
                cartItems.push(item.id);
            });

            this.props.dispatch(getCartItemUser(cartItems, userData.user.cart))
            .then(() => {
                this.setState({loading: false});

                if (this.props.cartItemDetails.length > 0) {
                    this.calculateTotalHandler(this.props.cartItemDetails);
                }
            });
        }
    }

    calculateTotalHandler = (cartItemDetails) => {
        let total = 0;

        cartItemDetails.forEach(item => {
            total += parseInt(item.price, 10) * item.quantity;
        });

        this.setState({
            total,
            showTotal: true
        });
    }

    removeCartItemHandler = (id) => {
        this.props.dispatch(removeCartItem(id))
        .then(res => {
            if (this.props.cartItemDetails.length === 0) {
                this.setState({showTotal: false})
            }
            else {
                this.calculateTotalHandler(this.props.cartItemDetails);
            }
        });
    }

    render() {
        return (
            <UserLayout>
            <div>
                <h1>My Cart</h1>
                <div className="user_cart">
                    {!this.state.loading ?
                        <React.Fragment>
                            <ProductBlock
                                products={this.props.cartItemDetails}
                                removeCartItem={(id) => this.removeCartItemHandler(id)}
                            />
                            {this.state.showTotal ?
                                <div>
                                    <div className="user_cart_sum">
                                        <div>
                                            Total amount: $ {this.state.total}
                                        </div>
                                    </div>
                                </div>
                                :
                                this.state.showSuccess ?
                                    <div className="cart_success">
                                        <FontAwesomeIcon icon={faSmile} />
                                        <div>Thank you.</div>
                                    </div>
                                    :
                                    <div className="cart_no_items">
                                        <FontAwesomeIcon icon={faFrown} />
                                        <div>You have no items.</div>
                                    </div>
                                
                            }
                        </React.Fragment>        
                        :
                        <LinearProgress />
                    }
                </div>
                {this.state.showTotal ?
                    <div className="paypal_button_container">
                        Paypal
                    </div>
                    :null
                }
            </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userLogin.userData,
        cartItemDetails: state.userLogin.cartItemDetails
    };
};

export default connect(mapStateToProps)(UserCart);