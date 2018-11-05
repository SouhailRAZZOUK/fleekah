import React, { PureComponent } from "react";
import FlickrImage from "../../containers/FlickrImage";
import TopBar from "../../components/TopBar";
import TopAppBarFixedAdjust from "../../components/TopBar/TopBarFixedAdjust";

class PhotoDetailsView extends PureComponent {
    render() {
        return <main id="main">
            <TopBar title="Image" type="all" canGoBack={true} history={this.props.history} />
            <TopAppBarFixedAdjust tag="section">
                <FlickrImage {...this.props} />
            </TopAppBarFixedAdjust>
        </main>
    }
}

export default PhotoDetailsView;