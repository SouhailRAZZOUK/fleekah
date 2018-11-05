import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import UserPhotosView from "./UserPhotosView";

class Home extends PureComponent {
    render() {
        return <Switch>
            <Route exact={true} path="/userPhotos" render={() => (<Redirect to="/" />)}/>
            <Route path="/userPhotos/:userId" component={UserPhotosView} />
        </Switch>;
    }
}

export default Home;
