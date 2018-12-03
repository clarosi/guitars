import React, { Component } from 'react';

import { connect } from 'react-redux';
import CustomButton from '../../UI/CustomButton/';
import { productDetailsRoute } from '../../../shared/utils/routeConstants';

class Card extends Component {
    renderCardImageHandler = (images) => {
        if (images.length > 0)
            return images[0].url;
        else
            return '../images/image_not_available.png';
    }

    render() {
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
                                    runAction={() => {
                                        console.log('run action');
                                    }}
                                />
                            </div>
                            : null
                        }
                    </div>
                </div>
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