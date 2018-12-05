import React, { Component } from 'react';

import { connect } from 'react-redux';
import { addToCartUser } from '../../../store/actions/';
import { productDetailsRoute } from '../../../shared/utils/routeConstants';
import { delay3sec } from '../../../shared/utils/numberConstants'
import CustomButton from '../../UI/CustomButton/';
import CustomizedSnackbars from '../../UI/SnackBars/';

class Card extends Component {
    state = {
        showSnackbar: false
    };

    renderCardImageHandler = (images) => {
        if (images.length > 0)
            return images[0].url;
        else
            return '../images/image_not_available.png';
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
            <div className={`card_item_wrapper ${this.props.grid}`}>
                <div
                    className="image"
                    style={{
                        background: `url(${this.renderCardImageHandler(this.props.images)}) no-repeat`
                    }}
                ></div>
                <div className="action_container">
                    <div className="tags">
                        <div className="brand">{this.props.brand.name}</div>
                        <div className="name">{this.props.name}</div>
                        <div className="price">${this.props.price}</div>
                    </div>
                    {this.props.grid ? 
                        <div className="description">
                            <p>{this.props.description}</p>
                        </div> 
                        : null
                    }
                    <div className="actions">
                        <div className="button_wrapp">
                            <CustomButton
                                type="link"
                                altClass="card_link"
                                title="View Product"
                                linkTo={`${productDetailsRoute}/${this.props._id}`}
                                addStyles={{margin: '10px 0 0 0'}}
                            />
                        </div>
                        {this.props.userData.isAuth ?
                            <div className="button_wrapp">
                                <CustomButton
                                    type="bag_link"
                                    runAction={() => this.addToCartHandler(this.props._id)}
                                />
                            </div>
                            : null
                        }
                    </div>
                </div>
                {customizedSnackbars}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userLogin.userData
    };
};

export default connect(mapStateToProps)(Card);