import React, { PureComponent } from "react";
import * as Sentry from '@sentry/browser';
import TopAppBar from '@material/react-top-app-bar';
import { TopBarActionsTypes } from "./utils";
import MaterialIcon from '@material/react-material-icon';

import '@material/react-material-icon/dist/material-icon.css';
import '@material/react-top-app-bar/dist/top-app-bar.css';
import "./styles.css";

class TopBar extends PureComponent {

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
    }

    render() {
        let { title, canGoBack, history, type } = this.props;
        type = type || "all";
        return <TopAppBar
            title={title}
            navigationIcon={<MaterialIcon
                icon='arrow_back'
                onClick={() => { history.goBack() }}
                style={{
                    display: canGoBack ? "block" : "none"
                }}
            />}
            actionItems={TopBarActionsTypes[type]} />

    }

}

export default TopBar;