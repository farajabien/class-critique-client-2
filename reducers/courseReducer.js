import { courseActionTypes } from '../constants'

export const initialState = {
	courses: [],
	uniCourses: [],
	lecturerCourses: [],
	courseReviews: [],
	selectedCourse: null,
	selectedUniCourse: null,
	loading: false,
	error: null,
}

const courseReducer = (state = initialState, action) => {
	switch (action.type) {
		case courseActionTypes.GET_ALL_COURSES_REQUEST:
		case courseActionTypes.GET_COURSE_FOR_UNI_REQUEST:
		case courseActionTypes.GET_COURSE_FOR_LECTURER_REQUEST:
		case courseActionTypes.GET_COURSE_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case courseActionTypes.GET_ALL_COURSES_SUCCESS:
			return {
				...state,
				courses: action.payload,
				loading: false,
			}
		case courseActionTypes.GET_ALL_COURSES_FOR_UNI_SUCCESS:
			return {
				...state,
				uniCourses: action.payload,
				loading: false,
			}

		case courseActionTypes.GET_ALL_COURSES_FOR_UNI_SUCCESS:
			return {
				...state,
				uniCourses: action.payload,
				loading: false,
			}

		case courseActionTypes.GET_COURSE_FOR_UNI_SUCCESS:
			return {
				...state,
				selectedUniCourse: action.payload,
				loading: false,
			}
		case courseActionTypes.GET_COURSE_SUCCESS:
			return {
				...state,
				selectedCourse: action.payload,
				loading: false,
			}

		case courseActionTypes.CREATE_COURSE_SUCCESS:
			return {
				...state,
				uniCourses: [...state.uniCourses, action.payload],
				loading: false,
			}
		case courseActionTypes.GET_ALL_COURSES_FAILURE:
		case courseActionTypes.GET_COURSE_FOR_UNI_FAILURE:
		case courseActionTypes.GET_COURSE_FOR_LECTURER_FAILURE:
		case courseActionTypes.GET_COURSE_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
			}
		default:
			return state
	}
}

export default courseReducer
