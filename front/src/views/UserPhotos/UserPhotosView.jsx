import React, { PureComponent } from "react";
import FlickrUserImages from "../../containers/FlickrUserImages";
import TopBar from "../../components/TopBar";
import TopAppBarFixedAdjust from "../../components/TopBar/TopBarFixedAdjust";

class UserPhotosView extends PureComponent {
    render() {
        return <main id="main">
            <TopBar title="User Images" type="all" canGoBack={true} history={this.props.history} />
            <TopAppBarFixedAdjust tag="section">
                <FlickrUserImages {...this.props} />
            </TopAppBarFixedAdjust>
        </main>
    }
}


export default UserPhotosView;