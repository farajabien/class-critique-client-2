//LECTURER REDUCER
// Path: reducers/lecturerReducer.js
// Compare this snippet from courseReducer.js:
import { lecturerActionTypes } from '../constants'

export const initialState = {
	courses: [],
	uniLecturers: [],
	courseLecturers: [],
	selectedLecturer: null,
	selectedUniLecturer: null,
	loading: false,
	error: null,
}

const lecturerReducer = (state = initialState, action) => {
	//compare from snippet from courseReducer.js
	switch (action.type) {
		case lecturerActionTypes.GET_ALL_LECTURERS_REQUEST:
		case lecturerActionTypes.GET_LECTURER_FOR_UNI_REQUEST:
		case lecturerActionTypes.GET_LECTURER_FOR_COURSE_REQUEST:
		case lecturerActionTypes.GET_LECTURER_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case lecturerActionTypes.GET_ALL_LECTURERS_SUCCESS:
			return {
				...state,
				lecturers: action.payload,
				loading: false,
			}
		case lecturerActionTypes.GET_ALL_LECTURERS_FOR_UNI_SUCCESS:
			return {
				...state,
				uniLecturers: action.payload,
				loading: false,
			}
		case lecturerActionTypes.GET_LECTURER_FOR_COURSE_SUCCESS:
			return {
				...state,
				courseLecturers: action.payload,
				loading: false,
			}
		case lecturerActionTypes.GET_LECTURER_SUCCESS:
			return {
				...state,
				selectedLecturer: action.payload,
				loading: false,
			}

		case lecturerActionTypes.GET_ALL_LECTURERS_FAILURE:
		case lecturerActionTypes.GET_LECTURER_FOR_UNI_FAILURE:
		case lecturerActionTypes.GET_LECTURER_FOR_COURSE_FAILURE:
		case lecturerActionTypes.GET_LECTURER_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
			}
		default:
			return state
	}
}

export default lecturerReducer
