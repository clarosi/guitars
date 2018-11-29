import React from 'react';

import CustomButton from '../UI/CustomButton';
import { shopRoute } from '../../shared/utils/routeConstants';

const HomPromotions = () => {
    const promotion = {
            _id: 1,
            img: '/images/featured/featured_home_3.jpg', 
            lineOne: 'Up to 50% off', 
            lineTwo: 'In second hand guitars', 
            linkTitle: 'Shop now', 
            linkTo: shopRoute
    };

    const generatePromotions = () => (
        <div
            className="home_promotion_img"
            style={{background: `url(${promotion.img})`}}
        >

            <div className="tag title">{promotion.lineOne}</div>
            <div className="tag low_title">{promotion.lineTwo}</div>
            <div>
                <CustomButton
                    type="link"
                    title={promotion.linkTitle}
                    linkTo={promotion.linkTo}
                    style={{margin: '10px 0 0 0'}}
                />
            </div>
        </div>
    )

    return (
        <div className="home_promotion">
            {generatePromotions()}
        </div>
    );
};

export default HomPromotions;