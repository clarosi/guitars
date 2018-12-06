import React from 'react';

import { getImage } from '../../../shared/utils/helperFunctions';

const showCartImage = (images) => {
    return getImage(images);
};

const ProductBlock = ({products, removeCartItem}) => {
    const showCartItemsHandler = () => (
        products ?
            products.map(item => (       
                <div
                    key={item._id} 
                    className="user_product_block"
                >
                    <div className="item">
                        <div 
                            className="image"
                            style={{background: `url(${showCartImage(item.images)}) no-repeat`}}
                        >
                        </div>
                    </div>
                    <div className="item">
                        <h4>Product name</h4>
                        <div>
                            {item.brand.name} {item.name}
                        </div>
                    </div>
                    <div className="item">
                        <h4>Quantity</h4>
                        <div>
                            {item.quantity}
                        </div>
                    </div>
                    <div className="item">
                        <h4>Price</h4>
                        <div>
                            $ {item.price}
                        </div>
                    </div>
                    <div className="item">
                        <div 
                            className="cart_remove_btn"
                            onClick={() => removeCartItem(item._id)}    
                        >
                            Remove
                        </div>
                    </div>
                </div>
            ))
        :
        null
    )

    return (
        <div>
            {showCartItemsHandler()}
        </div>
    );
};

export default ProductBlock;