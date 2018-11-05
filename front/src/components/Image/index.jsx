import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import * as Sentry from '@sentry/browser';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import ImagePreview from "./ImagePreview";
import ImageDetails from "./ImageDetails";
import SnackBar from "../SnackBar";
import Loader from "./Loader";

class Image extends PureComponent {

    componentDidMount() {
        let { photoId } = this.props.match.params;
        this.props.fetchPhotoDetails(photoId);
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
    }

    componentDidUpdate() {
        let { alerts, error } = this.props;
        if (error) {
            alerts.createAlert("snackBar", `Couldn't load image \n [${error}]`)
        }
    }

    render() {
        let { image, loading, error } = this.props;

        return <div>
            {
                loading && <Loader size={40} />
            }
            <Grid>
                <Row>
                    <Cell desktopColumns={6} tabletColumns={6} phoneColumns={4}>
                        <SnackBar />
                    </Cell>
                </Row>

                {
                    (Object.keys(image).length > 0 && !error) ?
                        <Row>
                            <Cell desktopColumns={6} tabletColumns={6} phoneColumns={4}>
                                <ImagePreview url={image.url || image.thumbnail} alt={image.title} />
                            </Cell>
                            <Cell desktopColumns={6} tabletColumns={6} phoneColumns={4}>
                                <ImageDetails image={image} />
                            </Cell>
                        </Row> :
                        <Row>
                            <Cell desktopColumns={6} tabletColumns={6} phoneColumns={4}>
                                <p>Sorry, no image with this ID was found, please retry later</p>
                            </Cell>
                        </Row>
                }
            </Grid>
        </div>
    }

}

Image.propTypes = {
    data: PropTypes.array
};

export default Image;