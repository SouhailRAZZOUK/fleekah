import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import FullViewLoader from "../FullViewLoader";


class Loader extends PureComponent {
    render() {
        return <FullViewLoader text="Loading Image ..." style={{ backgroundColor: "#fff", zIndex:"1001" }} />;
    }
}

Loader.propTypes = {
    show: PropTypes.bool,
    hide: PropTypes.bool
}

export default Loader;