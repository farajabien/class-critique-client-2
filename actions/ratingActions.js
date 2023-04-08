//ratingActions.js

//lecturerActions.js and refer to ratingReducer.js

import { ratingActionTypes } from '../constants'
import { getAllRatingsForCourse } from '../pages/api/data'

export const getRatingsForCourse = (courseId) => async (dispatch) => {
	if (courseId) {
		try {
			dispatch({ type: ratingActionTypes.GET_RATINGS_FOR_COURSE_REQUEST })
			const ratings = await getAllRatingsForCourse(courseId)

			dispatch({
				type: ratingActionTypes.GET_RATINGS_FOR_COURSE_SUCCESS,
				payload: ratings,
			})
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || 'Something went wrong RATINGS'
			dispatch({
				type: ratingActionTypes.GET_RATINGS_FOR_COURSE_FAILURE,
				payload: errorMessage,
			})
		}
	}
}
