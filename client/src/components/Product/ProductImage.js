import React, { Component } from 'react';

import ImageLightBox from '../UI/LightBox/';

class ProductImage extends Component {
    state = {
        lightbox: false,
        lightboxImages: [],
        imagePos: 0
    };

    componentDidMount() {
        const images = this.props.details[0].images;
        if (images.length > 0) {
            const lightboxImages = [];

            images.forEach(item => {
                lightboxImages.push(item.url);
            });

            this.setState({lightboxImages});
        }
    }

    renderCardImageHandler = (images) => {
        if (images.length >0) {
            return images[0].url;
        }
        else {
            return '/images/image_not_available.png';
        }
    }
    
    ligthboxHandler = (position) => {
        if (this.state.lightboxImages.length > 0) {
            this.setState({
                lightbox: true,
                imagePos: position
            });
        }
    }

    ligthboxCloseHandler = () => {
        this.setState({lightbox: false});
    }

    renderThumbsHandler = () => (
        this.state.lightboxImages.map((item, index) => (
            index > 0 ?
                <div
                    key={index}
                    onClick={() => this.ligthboxHandler(index)}
                    className="thumb"
                    style={{background: `url(${item}) no-repeat`}}
                ></div>
                :null
        ))
    )

    render() {
        const details = this.props.details[0];
        
        return (
            <div className="product_image_container">
                <div className="main_pic">
                    <div
                        style={{background: `url(${this.renderCardImageHandler(details.images)}) no-repeat`}}
                        onClick={() => this.ligthboxHandler(0)}
                    ></div>
                </div>
                <div className="main_thumbs">
                    {this.renderThumbsHandler()}
                </div>
                {this.state.lightbox ?
                    <ImageLightBox 
                        id={details._id}
                        images={this.state.lightboxImages}
                        open={this.state.lightbox}
                        position={this.state.imagePos}
                        onClose={() => this.ligthboxCloseHandler()}
                    />
                    :null
                }
            </div>
        );
    }
}

export default ProductImage;