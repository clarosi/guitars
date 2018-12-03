import React, { Component } from 'react';

import Lightbox from 'react-images';

class ImageLightBox extends Component {
    state = {
        lightboxIsOpen: true,
        currentImage: this.props.position,
        images: []
    };

    static getDerivedStateFromProps(currProps, prevState) {
        if (currProps.images) {
            const images = [];
            currProps.images.forEach(element => {
                images.push({src: `${element}`})
            });

            return prevState = { images };
        }
        return false;
    }

    gotoPrevious = () => {
        this.setState(prevState => ({
            currentImage: prevState.currentImage - 1
        }));
    }

    gotoNext = () => {
        this.setState(prevState => ({
            currentImage: prevState.currentImage + 1
        }));
    }

    render() {
        return (
            <Lightbox
                currentImage={this.state.currentImage}
                images={this.state.images}
                isOpen={this.state.lightboxIsOpen}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                onClose={() => this.props.onClose()}
            />
        );
    }
}

export default ImageLightBox;