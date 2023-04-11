//ratingActions.js

//lecturerActions.js and refer to ratingReducer.js

import { reviewActionTypes } from '../constants'
import { getAllReviewsForCourse } from '../pages/api/data'

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
