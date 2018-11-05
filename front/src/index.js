import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from "./App";

import './index.css';

// import dotenv from "dotenv";
// require('dotenv').config()

Sentry.init({
    dsn: "https://59320adb81824a64b224a2ba69434242@sentry.io/1313355"
});

ReactDOM.render(
    <App />,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
