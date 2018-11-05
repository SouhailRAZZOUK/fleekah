import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actions as alertActions } from 'react-redux-alerts';
import { fetchUserPhotos } from "../actions/FlickrActions";
import ImagesGrid from "../components/ImagesGrid";

const mapStateToProps = (state) => {
    const { flickrReducer } = state;
    return ({
        data: flickrReducer.userData,
        error: flickrReducer.error || false,
        loading: flickrReducer.loading || false,
        lazy: false,
        widthLink: false
    });
};

const matchDispatchToProps = (dispatch, ownProps) => ({
    fetchPhotos: () => {
        let { userId } = ownProps.match.params
        return dispatch(fetchUserPhotos(userId))
    },
    alerts: bindActionCreators(alertActions, dispatch)
});

export default connect(mapStateToProps, matchDispatchToProps)(ImagesGrid);
