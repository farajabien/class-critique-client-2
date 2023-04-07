import { uniActionTypes } from '../constants'

export const initialState = {
	unis: [],
	selectedUni: null,
	loading: false,
	error: null,
}

const uniReducer = (state = initialState, action) => {
	switch (action.type) {
		case uniActionTypes.GET_UNIS_REQUEST:
		case uniActionTypes.GET_UNI_COURSES_REQUEST:
		case uniActionTypes.GET_UNI_REQUEST:
		case uniActionTypes.CREATE_UNI_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case uniActionTypes.GET_UNIS_SUCCESS:
			return {
				...state,
				unis: action.payload,
				loading: false,
			}
		case uniActionTypes.GET_UNI_SUCCESS:
			return {
				...state,
				selectedUni: action.payload,
				loading: false,
			}
		case uniActionTypes.GET_UNI_COURSES_SUCCESS:
			return {
				...state,
				selectedUni: {
					...state.selectedUni,
					courses: action.payload,
				},
				loading: false,
			}
		case uniActionTypes.CREATE_UNI_SUCCESS:
			return {
				...state,
				unis: [...state.unis, action.payload],
				loading: false,
			}
		case uniActionTypes.GET_UNIS_FAILURE:
		case uniActionTypes.GET_UNI_FAILURE:
		case uniActionTypes.GET_UNI_COURSES_FAILURE:
		case uniActionTypes.CREATE_UNI_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
			}
		default:
			return state
	}
}

export default uniReducer
