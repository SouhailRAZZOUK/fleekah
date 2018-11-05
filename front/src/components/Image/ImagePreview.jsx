import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import IronImage from "react-image-lazy-load-component";

import "react-image-lazy-load-component/lib/style.css"

class ImagePreview extends PureComponent {

    render() {
        let {url, alt} = this.props;
        return <IronImage src={url} alt={alt} />
    }

}

ImagePreview.propTypes = {
    url: PropTypes.string
};

export default ImagePreview;