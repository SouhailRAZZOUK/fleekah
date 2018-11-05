import React, { PureComponent } from "react";
import { Map, TileLayer, Marker } from 'react-leaflet';

class ImageGeolocation extends PureComponent {

    _renderImageMarker(position) {
        if (position) {
            return <Marker position={position}></Marker>
        }
    }

    render() {
        let { position } = this.props; 

        return <div className="image-details__geoloacation">
            <h3>Geolocation</h3>
            {
                position ?
                    <Map center={position} zoom={5} style={{height: "200px"}}>
                        <TileLayer
                            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            this._renderImageMarker(position)
                        }
                    </Map> :
                    <div>No localization found</div>
            }
        </div>
    }
}

export default ImageGeolocation;