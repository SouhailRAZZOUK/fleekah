import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import IronImage from "react-image-lazy-load-component";

import "react-image-lazy-load-component/lib/style.css"

// import placeholder from "../../assets/images/placeholder.png";

class ImageThumbnail extends PureComponent {

    render() {
        let image = this.props.imageObject;
        if (image) {
            return <IronImage src={image.thumbnail} alt={image.description._content} />
        }
        return <div>No image</div>
    }

}

ImageThumbnail.propTypes = {
    imageObject: PropTypes.object
};

export default ImageThumbnail;