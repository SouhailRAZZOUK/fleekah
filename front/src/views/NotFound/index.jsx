/**
 * Copy/paste from https://codepen.io/jackoliver/pen/XKvWAV
 */

import React, { PureComponent } from "react";
import TopBar from "../../components/TopBar";
import TopAppBarFixedAdjust from "../../components/TopBar/TopBarFixedAdjust";

import "./styles.css";

class NotFound extends PureComponent {
    render() {
        return <main id="main">
            <TopBar title="Not Found" type="all" canGoBack={true} history={this.props.history} />
            <TopAppBarFixedAdjust tag="section">
                <div className="FourOhFour">
                    <div className="bg" style={{ backgroundImage: "url(http://i.giphy.com/l117HrgEinjIA.gif)" }}></div>
                    <div className="code">404</div>
                </div>
            </TopAppBarFixedAdjust>
        </main>
    }
}
export default NotFound;