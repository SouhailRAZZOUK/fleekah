import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actions as alertActions } from 'react-redux-alerts';
import { fetchPhotos } from "../actions/FlickrActions";
import ImagesMap from "../components/ImagesMap";

const mapStateToProps = (state) => {
    const { flickrReducer } = state;
    return ({
        images: flickrReducer.mapData || [],
        error: flickrReducer.error || null,
        loading: flickrReducer.loading
    });
};

const matchDispatchToProps = (dispatch, ownProps) => ({
    fetchPhotos: () => dispatch(fetchPhotos()),
    alerts: bindActionCreators(alertActions, dispatch)
});

export default connect(mapStateToProps, matchDispatchToProps)(ImagesMap);
