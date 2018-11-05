import { allReducers } from "./reducers";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

const enhancer = window.devToolsExtension ? window.devToolsExtension() : undefined
const enhancers = compose(applyMiddleware(thunk, logger), enhancer)
export default createStore(allReducers, enhancers);
