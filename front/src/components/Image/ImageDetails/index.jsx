import React, { PureComponent } from "react";
import * as Sentry from '@sentry/browser';
import PropTypes from "prop-types";
import ImageDescription from "./ImageDescription";
import ImageGeolocation from "./ImageGeolocation";
import ImageOwner from "./ImageOwner";
import ImageTags from "./ImageTags";

class ImageDetails extends PureComponent {

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
    }

    _renderImageDescription(image) {
        if (image.description) {
            return <ImageDescription description={image.description} />
        }
    }

    _renderImageGeolocation(image) {
        if (image.latitude && image.longitude) {
            let position = [image.latitude, image.longitude];
            return <ImageGeolocation position={position} />
        }
        return <ImageGeolocation position={null} />
    }

    _renderImageOwner(image) {
        let owner = {
            name: image.ownername,
            id: image.owner
        };
        return <ImageOwner owner={owner} />
    }

    _renderImageTags(image) {
        let tags = image.tags ? image.tags.split(" ") : [];
        return <ImageTags tags={tags} />
    }

    render() {
        let image = this.props.image;

        return <div>
            {this._renderImageDescription(image)}
            {this._renderImageGeolocation(image)}
            {this._renderImageOwner(image)}
            {this._renderImageTags(image)}
        </div>
    }

}

ImageDetails.propTypes = {
    image: PropTypes.object
};

export default ImageDetails;