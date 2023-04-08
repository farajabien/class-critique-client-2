//CREATE ratingReducer.js
// Path: reducers/ratingReducer.js
// Compare this snippet from reducers/lecturerReducer.js:
// // Path: reducers/lecturerReducer.js

import { ratingActionTypes } from '../constants'

export const initialState = {
	ratings: [],
	uniRatings: [],
	courseRatings: [],
	lecturerRatings: [],
	selectedRating: null,
	loading: false,
	error: null,
}

const ratingReducer = (state = initialState, action) => {
	switch (action.type) {
		case ratingActionTypes.GET_ALL_RATINGS_REQUEST:
		case ratingActionTypes.GET_RATING_FOR_UNI_REQUEST:
		case ratingActionTypes.GET_RATING_FOR_COURSE_REQUEST:
		case ratingActionTypes.GET_RATING_FOR_LECTURER_REQUEST:
		case ratingActionTypes.GET_RATING_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case ratingActionTypes.GET_ALL_RATINGS_SUCCESS:
			return {
				...state,
				ratings: action.payload,
				loading: false,
			}
		case ratingActionTypes.GET_ALL_RATINGS_FOR_UNI_SUCCESS:
			return {
				...state,
				uniRatings: action.payload,
				loading: false,
			}
		case ratingActionTypes.GET_RATING_FOR_COURSE_SUCCESS:
			return {
				...state,
				courseRatings: action.payload,
				loading: false,
			}
		case ratingActionTypes.GET_RATING_FOR_LECTURER_SUCCESS:
			return {
				...state,
				lecturerRatings: action.payload,
				loading: false,
			}
		case ratingActionTypes.GET_RATING_SUCCESS:
			return {
				...state,
				selectedRating: action.payload,
				loading: false,
			}

		case ratingActionTypes.GET_ALL_RATINGS_FAILURE:
		case ratingActionTypes.GET_RATING_FOR_UNI_FAILURE:
		case ratingActionTypes.GET_RATING_FOR_COURSE_FAILURE:
		case ratingActionTypes.GET_RATING_FOR_LECTURER_FAILURE:
		case ratingActionTypes.GET_RATING_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
			}
		default:
			return state
	}
}

export default ratingReducer
