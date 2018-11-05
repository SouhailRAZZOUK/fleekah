const initialState = {
	data: [],
	mapData: [],
	userData: [],
	page: 1,
	error: false,
	finished: false,
	loading: true,
	image: {},
	availableColors: {
		vibrants: [],
		muted: []
	}
};

export default function flickrReducer(state, action) {
	state = state || initialState;

	if (typeof state === 'undefined') {
		return initialState;
	}

	switch (action.type) {

		case "FETCH_PHOTOS_STARTED":
			return ({
				...state,
				error: false,
				loading: true
			});

		case "FETCH_PHOTOS_SUCCESS":
			return {
				...state,
				error: false,
				loading: false,
				mapData: action.data.filter(image => image)
			};

		case "FETCH_PHOTOS_FAILURE":
			return ({
				...state,
				error: action.error,
				loading: false,
				mapData: action.data
			});

		case "FETCH_PHOTOS_BATCH_STARTED":
			return ({
				...state,
				finished: false,
				error: false,
				loading: true
			});

		case "FETCH_PHOTOS_BATCH_SUCCESS":
			return action.page >= 1 ?
				({
					...state,
					page: action.page + 1,
					error: false,
					loading: false,
					data: action.data ? [...state.data, ...action.data] : state.data
				}) :
				({
					...state,
					page: 1,
					error: false,
					loading: false,
					data: action.data
				});

		case "FETCH_PHOTOS_BATCH_FINISH":
			return ({
				...state,
				loading: false,
				error: false,
				finished: true,
				data: state.data
			})

		case "FETCH_PHOTOS_BATCH_FAILURE":
			return ({
				...state,
				error: action.error,
				finished: true,
				loading: false,
				data: null
			});

		case "FETCH_PHOTO_DETAILS_STARTED":
			return ({
				...state,
				image: {},
				error: false,
				loading: true
			});

		case "FETCH_PHOTO_DETAILS_SUCCESS":
			return ({
				...state,
				image: action.image,
				error: false,
				loading: false,
			});

		case "FETCH_PHOTO_DETAILS_FAILURE":
			return ({
				...state,
				loading: false,
				error: action.error,
				image: {}
			});

		case "FETCH_USER_PHOTOS_STARTED":
			return ({
				...state,
				error: false,
				loading: true,
				userData: []
			});

		case "FETCH_USER_PHOTOS_SUCCESS":
			return ({
				...state,
				error: false,
				loading: false,
				userData: action.data
			});

		case "FETCH_USER_PHOTOS_FAILURE":
			return ({
				...state,
				error: action.error,
				loading: false,
				userData: action.data
			})

		// case "FETCH_AVAILABLE_COLORS_STARTED":
		case "FETCH_AVAILABLE_COLORS_SUCCESS":
			return ({
				...state,
				error: false,
				availableColors: action.availableColors
			})
		case "FETCH_AVAILABLE_COLORS_FAILURE":
			return ({
				...state,
				error: action.error,
				availableColors: []
			})

		case "FETCH_SEARCH_RESULTS_STARTED":
			return ({
				...state,
				searchData: [],
				error: false,
				loading: true
			})
		case "FETCH_SEARCH_RESULTS_SUCCESS":
			return ({
				...state,
				searchData: action.data,
				error: false,
				loading: false
			})
		case "FETCH_SEARCH_RESULTS_FAILURE":
			return ({
				...state,
				error: action.error,
				searchData: [],
				loading: false
			})
		default: return state;
	}
}