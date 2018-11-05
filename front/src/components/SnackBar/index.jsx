import React, { PureComponent } from 'react'
import ReactDOM from "react-dom";
import { createAlert } from 'react-redux-alerts';
import { MDCSnackbar } from '@material/snackbar';

import "@material/snackbar/dist/mdc.snackbar.css";
import "./styles.css";

class SnackBar extends PureComponent {

    constructor() {
        super();
        this._snackBarRef = React.createRef();
        this._createMDCSnackBar = this._createMDCSnackBar.bind(this);
    }

    _createMDCSnackBar() {
        let snackBarElement = ReactDOM.findDOMNode(this._snackBarRef.current);
        this._snackBarComponent = new MDCSnackbar(snackBarElement);
    }

    _show(settings) {
        this._snackBarComponent.show(settings);
    }

    componentDidMount() {
        let { message, close } = this.props
        // let { actionText, actionHandler, timeout } = options;
        let snackBarObj = {
            message,
            timeout: 360000,
            actionText: "Close",
            actionHandler: () => {
                close && close();
            }
        }
        this._createMDCSnackBar();
        this._show(snackBarObj);
    }

    render() {
        return <div className="mdc-snackbar mdc-snackbar--error"
            ref={this._snackBarRef}
            aria-live="assertive"
            aria-atomic="true"
            aria-hidden="true">
            <div className="mdc-snackbar__text"></div>
            <div className="mdc-snackbar__action-wrapper">
                <button type="button" className="mdc-snackbar__action-button"></button>
            </div>
        </div>;
    }
}

export default createAlert({
    alertName: 'snackBar'
})(SnackBar);
