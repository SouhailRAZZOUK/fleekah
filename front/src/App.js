import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import App from './App';
import Home from './views/Home';
import PhotoDetails from './views/PhotoDetails';
import UserPhotos from './views/UserPhotos';
import PhotosMap from './views/PhotosMap';
import SearchByColors from './views/SearchByColors';
import NotFound from './views/NotFound';
import store from './Store';

import './App.css';
import "@material/typography/dist/mdc.typography.css";
import '@material/react-ripple/dist/ripple.css';

class App extends Component {
  render() {
    return <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/photo" component={PhotoDetails} />
          <Route path="/userPhotos" component={UserPhotos} />
          <Route path="/map" component={PhotosMap} />
          <Route path="/searchByColors" component={SearchByColors} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  }
}

export default App;
