import React, { Component } from 'react';

import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserLayout from '../../hoc/Layout/UserLayout';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

class UserCart extends Component {
    state = {
        loading: false,
        total: 0,
        showTotal: false,
        showSuccess: false
    };

    componentDidMount() {
        const cartItem = [];
        const { userData } = this.props;
        console.log(userData.user.cart);
        if (userData.user.cart.length > 0) {
            userData.user.cart.forEach(item => {
                cartItem.push(item.id);
            });
        }
    }

    render() {
        return (
            <UserLayout>
            <div>
                Cart
            </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userLogin.userData
    };
};

export default connect(mapStateToProps)(UserCart);