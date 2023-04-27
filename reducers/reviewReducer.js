//CREATE reviewReducer.js
// Path: reducers/reviewReducer.js
// Compare this snippet from reducers/lecturerReducer.js:
// // Path: reducers/lecturerReducer.js

import { reviewActionTypes } from '../constants'

export const initialState = {
	reviews: [],
	uniReviews: [],
	courseReviews: [],
	lecturerReviews: [],
	selectedReview: null,
	loading: false,
	error: null,
}

const reviewReducer = (state = initialState, action) => {
	switch (action.type) {
		case reviewActionTypes.GET_ALL_REVIEWS_REQUEST:
		case reviewActionTypes.GET_REVIEW_FOR_UNI_REQUEST:
		case reviewActionTypes.GET_REVIEW_FOR_COURSE_REQUEST:
		case reviewActionTypes.GET_REVIEW_FOR_LECTURER_REQUEST:
		case reviewActionTypes.GET_REVIEW_REQUEST:
		case reviewActionTypes.CREATE_REVIEW_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case reviewActionTypes.GET_ALL_REVIEWS_SUCCESS:
			return {
				...state,
				reviews: action.payload,
				loading: false,
			}
		case reviewActionTypes.GET_ALL_REVIEWS_FOR_UNI_SUCCESS:
			return {
				...state,
				uniReviews: action.payload,
				loading: false,
			}
		case reviewActionTypes.GET_ALL_REVIEWS_FOR_COURSE_SUCCESS:
			return {
				...state,
				courseReviews: action.payload,
				loading: false,
			}
		case reviewActionTypes.GET_ALL_REVIEWS_FOR_LECTURER_SUCCESS:
			return {
				...state,
				lecturerReviews: action.payload,
				loading: false,
			}
		case reviewActionTypes.GET_REVIEW_FOR_UNI_SUCCESS:
			return {
				...state,
				selectedUniReview: action.payload,
				loading: false,
			}
		case reviewActionTypes.GET_REVIEW_FOR_COURSE_SUCCESS:
			return {
				...state,
				selectedCourseReview: action.payload,
				loading: false,
			}
		case reviewActionTypes.GET_REVIEW_FOR_LECTURER_SUCCESS:
			return {
				...state,
				selectedLecturerReview: action.payload,
				loading: false,
			}
		case reviewActionTypes.GET_REVIEW_SUCCESS:
			return {
				...state,
				selectedReview: action.payload,
				loading: false,
			}
		case reviewActionTypes.CREATE_REVIEW_SUCCESS:
			return {
				...state,
				loading: false,
			}

		case reviewActionTypes.GET_ALL_REVIEWS_FAILURE:
		case reviewActionTypes.GET_REVIEW_FOR_UNI_FAILURE:
		case reviewActionTypes.GET_REVIEW_FOR_COURSE_FAILURE:
		case reviewActionTypes.GET_REVIEW_FOR_LECTURER_FAILURE:
		case reviewActionTypes.GET_REVIEW_FAILURE:
		case reviewActionTypes.CREATE_REVIEW_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export default reviewReducer
