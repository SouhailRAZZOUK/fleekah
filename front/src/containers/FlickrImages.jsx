import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchPhotos, fetchNextPhotosBatch } from "../actions/FlickrActions";
import { actions as alertActions } from 'react-redux-alerts';
import ImagesGrid from "../components/ImagesGrid";

const mapStateToProps = (state) => {
    const { flickrReducer } = state;
    return ({
        page: flickrReducer.page || 1,
        data: flickrReducer.data,
        error: flickrReducer.error,
        loading: flickrReducer.loading,
        finished: flickrReducer.finished,
        withLink: true,
        lazy: true
    });
};

const matchDispatchToProps = (dispatch, ownProps) => ({
    fetchPhotos: () => dispatch(fetchPhotos()),
    fetchNextPhotosBatch: (page) => dispatch(fetchNextPhotosBatch(page)),
    alerts: bindActionCreators(alertActions, dispatch)
});

export default connect(mapStateToProps, matchDispatchToProps)(ImagesGrid);
