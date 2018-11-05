import React, { PureComponent } from 'react'
import * as Sentry from '@sentry/browser';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from "react-router-dom";
import Loader from "../FullViewLoader";
import SnackBar from "../SnackBar";
import { oneTime } from "../../utils";

import "./styles.css";

class ImagesMap extends PureComponent {

    constructor() {
        super();
        this._renderImageMarker = this._renderImageMarker.bind(this);
        this._renderImagesMarkers = this._renderImagesMarkers.bind(this);
    }

    componentDidMount() {
        this.props.fetchPhotos();
        this.setState({
            ...this.state,
            once: oneTime() // this is a hack because of the cranky way react-redux-alerts work
        });
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
        console.log("update");

        let { alerts, error } = this.props;
        let { once } = this.state;
        if (error && once.next().value) {
            console.log("error");
            setTimeout(() => {
                alerts.createAlert("snackBar", `Couldn't load images \n [${error}]`)
            }, 100);
        }
    }

    _calculateMapCenter(images) {
        let count = images.length;
        let xs = images.map((image) => parseFloat(image.latitude));
        let ys = images.map((image) => parseFloat(image.longitude));
        let xSum = (xs && xs.length) ? xs.reduce((accumulation, x) => accumulation + x) : 0;
        let ySum = (ys && ys.length) ? ys.reduce((accumulation, x) => accumulation + x) : 0;
        let center_x = xSum ? xSum / count : 0;
        let center_y = ySum ? ySum / count : 0;
        return [center_x, center_y];
    }

    _renderImagesMarkers(images) {
        return images.map(this._renderImageMarker);
    }

    _renderImageMarker(image, key) {
        let position = [image.latitude, image.longitude];

        return <Marker position={position} key={key} style={{ width: "auto" }}>
            <Popup>
                <Link to={`/photo/${image.id}`} style={{ width: "102px" }}>
                    <img src={image.thumbnail} alt="" style={{ height: "100px", maxWidth: "200px", display: "block" }} />
                </Link>
            </Popup>
        </Marker>
    }

    render() {
        const { images, loading } = this.props;
        const imagesToMap = images.filter((image) => (image.latitude !== 0 && image.longitude !== 0));
        const center = this._calculateMapCenter(imagesToMap);
        return <div className="map-wrapper">
            <Map center={center} zoom={2}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    (imagesToMap && Array.isArray(imagesToMap)) && (imagesToMap.length > 0) ?
                        this._renderImagesMarkers(imagesToMap) :
                        null
                }
            </Map>
            {
                loading && <Loader text="Loading Images ..." />
            }
            <SnackBar />
        </div>;
    }
}

export default ImagesMap;