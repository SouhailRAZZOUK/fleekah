import { combineReducers } from 'redux';
import { alertReducer } from 'react-redux-alerts';
import flickrReducer from "./FlickrReducer";

export let allReducers = combineReducers({
  flickrReducer,
  alerts: alertReducer
});