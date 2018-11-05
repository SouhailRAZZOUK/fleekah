import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import MDSpinner from "react-md-spinner";
import { Row, Cell } from '@material/react-layout-grid';
import Button from '@material/react-button';
import VisibilitySensor from "react-visibility-sensor";
import MaterialIcon from "@material/react-material-icon";

import '@material/react-button/dist/button.css';

class Loader extends PureComponent {

    constructor() {
        super();
        this._handleLoadingState = this._handleLoadingState.bind(this);
        this._renderFinishState = this._renderFinishState.bind(this);
        this._renderLoadingState = this._renderLoadingState.bind(this);
        this._handleRetryClick = this._handleRetryClick.bind(this);
    }

    _renderLoadingState() {
        return <MDSpinner size={40} />;
    }

    _renderFinishState() {
        return <p>No more photos to show</p>;
    }

    _handleRetryClick() {
        let { onRetry } = this.props;
        if (onRetry) onRetry();
    }

    _returnRetryState() {
        const retryIcon = <MaterialIcon icon="refresh" />
        return <Button dense raised icon={retryIcon} onClick={this._handleRetryClick}>Retry</Button>
    }

    _handleLoadingState(state) {
        let { isVisible } = state;
        let { loading, onVisible, error } = this.props;
        if (isVisible && onVisible) {
            onVisible();
        }
        if (loading) {
            return this._renderLoadingState();
        }
        if (error) {
            return this._returnRetryState();
        }
        return this._renderFinishState();
    }

    render() {
        return <Row>
            <Cell align={"middle"} phoneColumns={4} tabletColumns={8} desktopColumns={12} style={{ textAlign: "center", paddingTop: "24px" }}>
                <VisibilitySensor>
                    {this._handleLoadingState}
                </VisibilitySensor>
            </Cell>
        </Row>
        // return <div>
        //     Loaded :D
        // </div>;
    }

}

Loader.propTypes = {
    show: PropTypes.bool,
    hide: PropTypes.bool
}

export default Loader;