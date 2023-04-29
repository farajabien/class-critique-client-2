import { lecturerActionTypes } from '../constants'
import {
	getAllLecturersForCourse,
	getLecturersByUniId,
	addNewLecturer,
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
			const errorMessage = error.response?.data?.error || 'Something went wrong'
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
			const errorMessage = error.response.data.error || 'Something went wrong'
			dispatch({
				type: lecturerActionTypes.GET_ALL_LECTURERS_FOR_COURSE_FAILURE,
				payload: errorMessage,
			})
		}
	}
}

//ADD LECTURER
export const addLecturer = (user, uniId, lecturer) => async (dispatch) => {
	if (uniId) {
		try {
			dispatch({
				type: lecturerActionTypes.CREATE_LECTURER_REQUEST,
			})
			const courseLecturers = await addNewLecturer(user, uniId, lecturer)
			dispatch({
				type: lecturerActionTypes.CREATE_LECTURER_SUCCESS,
				payload: courseLecturers,
			})
		} catch (error) {
			const errorMessage =
				error.response.data.error || 'Something went wrong adding new lec'
			dispatch({
				type: lecturerActionTypes.CREATE_LECTURER_FAILURE,
				payload: errorMessage,
			})
		}
	}
}
