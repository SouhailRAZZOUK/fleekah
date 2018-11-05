import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImageThumbnail from "./ImageThumbnail";
import { Link } from "react-router-dom";
import { Cell, Row } from '@material/react-layout-grid';

import '@material/react-layout-grid/dist/layout-grid.css';


class ImagesView extends PureComponent {

    constructor(props) {
        super(props);
        this._renderThumbnail = this._renderThumbnail.bind(this);
        this._renderThumbnails = this._renderThumbnails.bind(this);
    }

    _renderThumbnail(image, key) {
        let { withLink } = this.props;
        if (withLink) {
            return <Cell key={key} desktopColumns={3} tabletColumns={4} phoneColumns={4}>
                <Link to={`/photo/${image.id}`}>
                    <ImageThumbnail imageObject={image} />
                </Link>
            </Cell>
        }
        return <Cell key={key} desktopColumns={3} tabletColumns={4} phoneColumns={4}>
            <ImageThumbnail key={key} imageObject={image} />
        </Cell>
    }

    _renderThumbnails(images) {
        return images && Array.isArray(images) ? images.map(this._renderThumbnail) : "No images"
    }

    render() {
        let { images } = this.props;
        images = images ? images.filter(image => image): [];
        return <Row>
            {this._renderThumbnails(images)}
        </Row>
    }

}

ImagesView.propTypes = {
    data: PropTypes.array
};

export default ImagesView;