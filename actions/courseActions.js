import axios from 'axios'
import { courseActionTypes } from '../constants'
import {
	getAllCourses,
	getCoursesByUniId,
	getCourseByUniIdCourseId,
	addNewCourse,
} from '../pages/api/data'

export const getCourses = () => async (dispatch) => {
	try {
		dispatch({ type: courseActionTypes.GET_ALL_COURSES_REQUEST })
		const unis = await getAllCourses()
		dispatch({ type: courseActionTypes.GET_ALL_COURSES_SUCCESS, payload: unis })
	} catch (error) {
		dispatch({
			type: courseActionTypes.GET_ALL_COURSES_FAILURE,
			payload: error.response.data.message,
		})
	}
}

export const getCoursesByUni = (uniId) => async (dispatch) => {
	if (uniId) {
		try {
			dispatch({ type: courseActionTypes.GET_ALL_COURSES_FOR_UNI_REQUEST })
			const uniCourses = await getCoursesByUniId(uniId)

			dispatch({
				type: courseActionTypes.GET_ALL_COURSES_FOR_UNI_SUCCESS,
				payload: uniCourses,
			})
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || 'Something went wrong'
			dispatch({
				type: courseActionTypes.GET_ALL_COURSES_FOR_UNI_FAILURE,
				payload: errorMessage,
			})
		}
	}
}

export const getCourseByUniCourse = (uniId, courseId) => async (dispatch) => {
	if (uniId) {
		try {
			dispatch({ type: courseActionTypes.GET_COURSE_FOR_UNI_REQUEST })
			const selectedUniCourse = await getCourseByUniIdCourseId(uniId, courseId)

			dispatch({
				type: courseActionTypes.GET_COURSE_FOR_UNI_SUCCESS,
				payload: selectedUniCourse,
			})
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || 'Something went wrong'
			dispatch({
				type: courseActionTypes.GET_COURSE_FOR_UNI_FAILURE,
				payload: errorMessage,
			})
		}
	}
}

//ADD COURSE
export const addCourse = (token, uniId, lecturer) => async (dispatch) => {
	if (uniId) {
		try {
			dispatch({
				type: courseActionTypes.CREATE_COURSE_REQUEST,
			})
			const uniCourses = await addNewCourse(token, uniId, lecturer)
			dispatch({
				type: courseActionTypes.CREATE_COURSE_SUCCESS,
				payload: uniCourses,
			})
		} catch (error) {
			const errorMessage =
				error.response?.data?.message ||
				'Something went wrong adding new course'
			dispatch({
				type: courseActionTypes.CREATE_COURSE_FAILURE,
				payload: errorMessage,
			})
		}
	}
}
