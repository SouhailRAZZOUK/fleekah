import React, { PureComponent } from 'react';
import FlickrImages from "../containers/FlickrImages";
import TopBar from "../components/TopBar";
import TopAppBarFixedAdjust from "../components/TopBar/TopBarFixedAdjust";

class Home extends PureComponent {
  render() {
    return <main id="main">
      <TopBar title="Home" type="home" canGoBack={false} history={this.props.history} />
      <TopAppBarFixedAdjust tag="section">
        <FlickrImages />
      </TopAppBarFixedAdjust>
    </main>

  }
}

export default Home;
