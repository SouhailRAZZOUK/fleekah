import React, { PureComponent } from 'react';
import { Switch, Route } from "react-router-dom";
import PhotoDetailsView from "./PhotoDetailsView";

class PhotoDetails extends PureComponent {
  render() {
    return <Switch>
      <Route path="/photo/:photoId" component={PhotoDetailsView} />
    </Switch>;
  }
}

export default PhotoDetails;