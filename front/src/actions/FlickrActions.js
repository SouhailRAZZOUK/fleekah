const API_PROTOCOL = "https";
const API_HOST = `${API_PROTOCOL}://wt-souhail_razzouk-hotmail_com-0.sandbox.auth0-extend.com/fleekah-back-end`;

const handleErrors = (response) => {
	if (!response.ok) {
		throw new Error("error");
	}
	return response;
}

export const fetchPhotos = () => (dispatch) => {

	dispatch({
		type: 'FETCH_PHOTOS_STARTED'
	});

	return fetch(`${API_HOST}/photos`)
		.then(handleErrors)
		.then((response) => response.json())
		.then((data) => dispatch({
			data,
			error: null,
			loading: false,
			finished: true,
			type: 'FETCH_PHOTOS_SUCCESS'
		}))
		.catch((error) => {
			dispatch({
				error,
				data: null,
				loading: false,
				type: 'FETCH_PHOTOS_FAILURE',
			})
		});
}

export const fetchNextPhotosBatch = (page) => (dispatch) => {
	dispatch({
		type: 'FETCH_PHOTOS_BATCH_STARTED'
	});

	return fetch(`${API_HOST}/photos?page=${page}`)
		// .then(handleErrors)
		.then((response) => response.json())
		.then((data) => {
			if (Array.isArray(data) && data.length) {
				return dispatch({
					error: null,
					data,
					page,
					loading: false,
					finished: false,
					type: 'FETCH_PHOTOS_BATCH_SUCCESS'
				})
			}
			dispatch({
				error: null,
				loading: false,
				finished: true,
				type: 'FETCH_PHOTOS_BATCH_FINISH'
			})
		})
		.catch((error) => {
			dispatch({
				error,
				data: null,
				page,
				loading: false,
				finished: true,
				type: 'FETCH_PHOTOS_BATCH_FAILURE',
			})
		});
}

export const fetchPhotoDetails = (photoId) => (dispatch) => {
	dispatch({
		type: "FETCH_PHOTO_DETAILS_STARTED"
	});

	return fetch(`${API_HOST}/photo/${photoId}`)
		.then(handleErrors)
		.then((response) => response.json())
		.then((image) => dispatch({
			error: null,
			image,
			type: 'FETCH_PHOTO_DETAILS_SUCCESS'
		}))
		.catch((error) => {
			dispatch({
				error,
				type: 'FETCH_PHOTO_DETAILS_FAILURE',
			});
		});
}

export const fetchUserPhotos = (userId) => (dispatch) => {
	dispatch({
		type: "FETCH_USER_PHOTOS_STARTED"
	});

	return fetch(`${API_HOST}/userPhotos/${userId}`)
		.then(handleErrors)
		.then((response) => response.json())
		.then((data) => dispatch({
			error: null,
			data,
			loading: false,
			type: 'FETCH_USER_PHOTOS_SUCCESS'
		}))
		.catch((error) => {
			dispatch({
				error,
				data: null,
				loading: false,
				type: 'FETCH_USER_PHOTOS_FAILURE',
			})
		});
}

export const fetchAvilableColors = () => (dispatch) => {
	return fetch(`${API_HOST}/availableColors`)
		.then(handleErrors)
		.then((response) => response.json())
		.then((data) => dispatch({
			error: null,
			availableColors: data,
			type: 'FETCH_AVAILABLE_COLORS_SUCCESS'
		}))
		.catch((error) => {
			dispatch({
				error,
				availableColors: null,
				type: 'FETCH_AVAILABLE_COLORS_FAILURE',
			})
		});
}

export const fetchSearchResults = (searchedColors) => (dispatch) => {
	dispatch({
		type: "FETCH_SEARCH_RESULTS_STARTED"
	})
	return fetch(`${API_HOST}/searchByColors`, {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, cors, *same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			// "Content-Type": "application/x-www-form-urlencoded",
		},
		redirect: "follow", // manual, *follow, error
		referrer: "no-referrer", // no-referrer, *client
		body: JSON.stringify(searchedColors), // body data type must match "Content-Type" header
	})
		.then(handleErrors)
		.then((response) => response.json())
		.then((data) => dispatch({
			error: null,
			data,
			loading: false,
			type: 'FETCH_SEARCH_RESULTS_SUCCESS'
		}))
		.catch((error) => {
			dispatch({
				error,
				data: null,
				loading: false,
				type: 'FETCH_SEARCH_RESULTS_FAILURE',
			})
		});
}