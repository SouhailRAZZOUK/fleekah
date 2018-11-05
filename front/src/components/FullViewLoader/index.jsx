import React, { PureComponent } from "react";
import MDSpinner from "react-md-spinner";

import "./styles.css";

class FullViewLoader extends PureComponent {

    render() {
        let { text, style } = this.props;
        return <div className="loader" style={style}>
            <div className="loader__container">
                <MDSpinner size={40} />
                <p>{text}</p>
            </div>
        </div>
    }

}

export default FullViewLoader;