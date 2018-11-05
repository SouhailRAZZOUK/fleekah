import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actions as alertActions } from 'react-redux-alerts';
import SearchByColors from "../components/SearchByColors";
import { fetchAvilableColors, fetchSearchResults } from "../actions/FlickrActions";


const mapStateToProps = (state) => {
    const { flickrReducer } = state;
    return ({
        data: flickrReducer.searchData || [],
        error: flickrReducer.error || false,
        loading: flickrReducer.loading || false,
        availableColors: flickrReducer.availableColors || [],
    });
};

const matchDispatchToProps = (dispatch, ownProps) => ({
    fetchAvilableColors: () => dispatch(fetchAvilableColors()),
    fetchSearchResults: (searchedColors) => dispatch(fetchSearchResults(searchedColors)),
    alerts: bindActionCreators(alertActions, dispatch)
});

export default connect(mapStateToProps, matchDispatchToProps)(SearchByColors);
