import React, { PureComponent } from 'react';
import FlickrImagesSearchByColors from "../containers/FlickrImagesSearchByColors";
import TopBar from "../components/TopBar";
import TopAppBarFixedAdjust from "../components/TopBar/TopBarFixedAdjust";

class Home extends PureComponent {
  render() {
    return <main id="main">
      <TopBar title="Search Photos By Colors" type="search" canGoBack={true} history={this.props.history}/>
      <TopAppBarFixedAdjust tag="section">
        <FlickrImagesSearchByColors />
      </TopAppBarFixedAdjust>
    </main>

  }
}

export default Home;
