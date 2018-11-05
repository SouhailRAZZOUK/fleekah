import { allReducers } from "./reducers";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from "redux-thunk";
import logger from "redux-logger";

// const enhancer = window.devToolsExtension ? window.devToolsExtension() : undefined
const enhancers = composeWithDevTools(applyMiddleware(thunk, logger))
export default createStore(allReducers, enhancers);
