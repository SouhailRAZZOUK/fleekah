import React, { PureComponent } from "react";
import * as Sentry from '@sentry/browser';
import PropTypes from "prop-types";
import { Grid, Row, Cell } from '@material/react-layout-grid';
import ImagesView from "./ImagesView";
import Loader from "./Loader";
import SnackBar from "../SnackBar";

class ImagesGrid extends PureComponent {

    constructor() {
        super();
        this._fetchNextPhotosBatch = this._fetchNextPhotosBatch.bind(this);
        this._retryFetchPhotos = this._retryFetchPhotos.bind(this);
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

    componentDidMount() {
        let { lazy, fetchNextPhotosBatch, fetchPhotos, page } = this.props;

        if (lazy) {
            fetchNextPhotosBatch(page || 1);
        } else {
            fetchPhotos();
        }
    }

    componentDidUpdate() {
        let { alerts, error, finished } = this.props;
        if (error && finished) {
            alerts.createAlert("snackBar", `Couldn't load images \n [${error}]`)
        }
    }

    _fetchNextPhotosBatch() {
        let { page, loading, finished, fetchNextPhotosBatch } = this.props;
        if (!loading && !finished) {
            fetchNextPhotosBatch(page);
        }
    }

    _retryFetchPhotos() {
        let { lazy, page, fetchPhotos, fetchNextPhotosBatch } = this.props;
        if (lazy) {
            fetchNextPhotosBatch(page);
        } else {
            fetchPhotos()
        }
    }

    render() {
        let { withLink, data, loading, lazy, finished } = this.props;
        let loaderError = !Array.isArray(data);

        return <Grid>
            <ImagesView withLink={withLink} images={data} />
            {
                lazy ?
                    <Loader loading={loading} finished={finished} error={loaderError} onVisible={this._fetchNextPhotosBatch} onRetry={this._retryFetchPhotos} /> :
                    <Loader loading={loading} finished={finished} onRetry={this._retryFetchPhotos} />
            }
            <Row>
                <Cell>
                    <SnackBar />
                </Cell>
            </Row>
        </Grid>
    }

}

ImagesGrid.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    page: PropTypes.number
}

export default ImagesGrid