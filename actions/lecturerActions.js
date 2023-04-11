import { lecturerActionTypes } from '../constants'
import {
	getAllLecturersForCourse,
	getLecturersByUniId,
} from '../pages/api/data'

export const getLecturersByUni = (uniId) => async (dispatch) => {
	if (uniId) {
		try {
			dispatch({ type: lecturerActionTypes.GET_ALL_LECTURERS_FOR_UNI_REQUEST })
			const uniLecturers = await getLecturersByUniId(uniId)

			dispatch({
				type: lecturerActionTypes.GET_ALL_LECTURERS_FOR_UNI_SUCCESS,
				payload: uniLecturers,
			})
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || 'Something went wrong'
			dispatch({
				type: lecturerActionTypes.GET_ALL_LECTURERS_FOR_UNI_FAILURE,
				payload: errorMessage,
			})
		}
	}
}

export const getCourseLecturers = (uniId, courseId) => async (dispatch) => {
	if (uniId && courseId) {
		try {
			dispatch({
				type: lecturerActionTypes.GET_ALL_LECTURERS_FOR_COURSE_REQUEST,
			})
			const courseLecturers = await getAllLecturersForCourse(uniId, courseId)
			dispatch({
				type: lecturerActionTypes.GET_ALL_LECTURERS_FOR_COURSE_SUCCESS,
				payload: courseLecturers,
			})
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || 'Something went wrong'
			dispatch({
				type: lecturerActionTypes.GET_ALL_LECTURERS_FOR_COURSE_FAILURE,
				payload: errorMessage,
			})
		}
	}
}
