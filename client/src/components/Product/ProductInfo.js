import React from 'react';

import CustomButton from '../UI/CustomButton/';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const ProductInfo = (props) => {
    const details = props.details[0];

    const renderProductTagsHandler = () => (
        <div className="product_tags">
            {details.shipping ?
                <div className="tags">
                    <div><FontAwesomeIcon icon={faTruck} /></div>
                    <div className="tag_tex">
                        <div>Free shipping</div>
                        <div>and return</div>
                    </div>
                </div>
                :null
            }
            <div className="tags">
                <div><FontAwesomeIcon icon={details.available ? faCheck : faTimes} /></div>
                <div className="tag_tex">
                    <div>{details.available ? 'Available' : 'Not Available'}</div>
                    <div>{details.available ? 'in store' : 'pre-order only'}</div>
                </div>
            </div>
        </div>
    )

    const renderProductActionsHandler = () => (
        <div className="product_actions">
            <div className="price">$ {details.price}</div>
            {props.userData.isAuth ?
                <div className="cart">
                    <CustomButton
                        type="bag_link"
                        text=" Add to cart"
                        isLoading={props.isLoading}
                        runAction={() => props.addToCart(details._id)}
                    />
                </div>
                :null
            }
        </div>
    )

    const renderProductSpecsHandler = () => (
        <div className="product_specifications">
            <h2>Specifications</h2>
            <div>
                <div className="item">
                    <strong>Frets: </strong> {details.frets}
                </div>
                <div className="item">
                    <strong>Wood: </strong> {details.wood.name}
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <h1>{details.brand.name} {details.name}</h1>
            <p>{details.description}</p>
            {renderProductTagsHandler()}
            {renderProductActionsHandler()}
            {renderProductSpecsHandler()}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userData: state.user.userData
    };
};

export default connect(mapStateToProps)(ProductInfo);