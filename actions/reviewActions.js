import { reviewActionTypes } from '../constants'
import { getAllReviewsForCourse, addNewReview } from '../pages/api/data'
import { getCourseLecturers } from './lecturerActions'

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

export const addReview =
	(courseId, review, token, uniId) => async (dispatch) => {
		try {
			dispatch({ type: reviewActionTypes.CREATE_REVIEW_REQUEST })
			const addedReview = await addNewReview(courseId, review, token)

			// Get updated reviews list and lecturer list
			dispatch(getReviewsForCourse(courseId))
			dispatch(getCourseLecturers(uniId, courseId))

			dispatch({
				type: reviewActionTypes.CREATE_REVIEW_SUCCESS,
				payload: addedReview,
			})
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || 'Something went wrong'
			dispatch({
				type: reviewActionTypes.CREATE_REVIEW_FAILURE,
				payload: errorMessage,
			})
		}
	}
