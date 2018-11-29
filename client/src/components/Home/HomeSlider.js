import React from 'react';

import Slider from 'react-slick';
import CustomButton from '../UI/CustomButton';
import { shopRoute } from '../../shared/utils/routeConstants';

const HomeSlider = () => {
    const slides = [
        {
            _id: 1,
            img: '/images/featured/featured_home.jpg', 
            lineOne: 'Finder', 
            lineTwo: 'Custom Shop', 
            linkTitle: 'Shop now', 
            linkTo: shopRoute
        },
        {
            _id: 2,
            img: '/images/featured/featured_home_2.jpg', 
            lineOne: 'B-Stock', 
            lineTwo: 'Awesome discounts', 
            linkTitle: 'View offers', 
            linkTo: shopRoute
        }
    ];

    const settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    const generateSlides = () => (
        slides.map(slide => (
            <div key={slide._id}>
                <div 
                    className="featured_image"
                    style={{
                        background: `url(${slide.img})`,
                        height: `${window.innerHeight}px`
                    }}
                >
                    <div className="featured_action">
                        <div className="tag title">{slide.lineOne}</div>
                        <div className="tag low_title">{slide.lineTwo}</div>
                        <div>
                            <CustomButton
                                type="link"
                                title={slide.linkTitle}
                                linkTo={slide.linkTo}
                                style={{margin: '10px 0 0 0'}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        ))
    )

    return (
        <div className="featured_container">
            <Slider {...settings}>
                {generateSlides()}
            </Slider>
        </div>
    );
};

export default HomeSlider;