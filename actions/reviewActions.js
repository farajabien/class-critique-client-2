import { reviewActionTypes } from '../constants'
import { getAllReviewsForCourse, addNewReview } from '../pages/api/data'

export const getReviewsForCourse = (courseId) => async (dispatch) => {
	if (courseId) {
		try {
			dispatch({ type: reviewActionTypes.GET_ALL_REVIEWS_FOR_COURSE_REQUEST })
			const reviews = await getAllReviewsForCourse(courseId)

			dispatch({
				type: reviewActionTypes.GET_ALL_REVIEWS_FOR_COURSE_SUCCESS,
				payload: reviews,
			})
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || 'Something went wrong'
			dispatch({
				type: reviewActionTypes.GET_ALL_REVIEWS_FOR_COURSE_FAILURE,
				payload: errorMessage,
			})
		}
	}
}

//ADD REVIEW
// Path: actions/reviewActions.js

export const addReview = (courseId, review, token) => async (dispatch) => {
	try {
		dispatch({ type: reviewActionTypes.CREATE_REVIEW_REQUEST })
		const addedReview = await addNewReview(courseId, review, token)

		dispatch({
			type: reviewActionTypes.CREATE_REVIEW_SUCCESS,
			payload: addedReview,
		})
		getReviewsForCourse(courseId)
	} catch (error) {
		const errorMessage = error.response?.data?.message || 'Something went wrong'
		dispatch({
			type: reviewActionTypes.CREATE_REVIEW_FAILURE,
			payload: errorMessage,
		})
	}
}
