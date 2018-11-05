import React, { PureComponent } from 'react';
import FlickrImagesMap from "../containers/FlickrImagesMap";
import TopBar from "../components/TopBar";
import TopAppBarFixedAdjust from "../components/TopBar/TopBarFixedAdjust";

class PhotosMap extends PureComponent {
    render() {
        return <main id="main">
            <TopBar title="Map" type="map" canGoBack={true} history={this.props.history}/>
            <TopAppBarFixedAdjust tag="section">
                <FlickrImagesMap />
            </TopAppBarFixedAdjust>
        </main>

    }
}

export default PhotosMap;
