import { connect } from "react-redux";
import { fetchPhotoDetails } from "../actions/FlickrActions";
import { bindActionCreators } from 'redux';
import { actions as alertActions } from 'react-redux-alerts';
import Image from "../components/Image";

const mapStateToProps = (state) => {
    const { flickrReducer } = state;
    return ({
        image: flickrReducer.image || {},
        loading: flickrReducer.loading || false,
        error: flickrReducer.error || false,
    });
};

const matchDispatchToProps = (dispatch, ownProps) => ({
    fetchPhotoDetails: (photoId) => dispatch(fetchPhotoDetails(photoId)),
    alerts: bindActionCreators(alertActions, dispatch)
});

export default connect(mapStateToProps, matchDispatchToProps)(Image);
