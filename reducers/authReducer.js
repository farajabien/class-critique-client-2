import { authActionTypes } from '../constants'

const initialState = {
	loading: true, // set loading to true by default
	userData: null,
	error: null,
}

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case authActionTypes.REGISTER_REQUEST:
		case authActionTypes.GET_USER_DETAILS_REQUEST:
			return {
				...state,
				userData: null,
				error: null,
				loading: true,
			}
		case authActionTypes.REGISTER_SUCCESS:
		case authActionTypes.GET_USER_DETAILS_SUCCESS:
			return {
				...state,
				userData: action.payload,
				error: null,
				loading: false,
			}
		case authActionTypes.REGISTER_FAILURE:
		case authActionTypes.GET_USER_DETAILS_FAILURE:
			return {
				...state,
				userData: null,
				error: action.payload,
				loading: false,
			}

		default:
			return state
	}
}
