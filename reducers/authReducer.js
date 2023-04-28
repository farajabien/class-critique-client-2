import { authActionTypes } from '../constants'

const initialState = {
	loading: false,
	userData: null,
	error: null,
}

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case authActionTypes.REGISTER_REQUEST:
			return {
				...state,
				userData: null,
				error: null,
				loading: true,
			}
		case authActionTypes.REGISTER_SUCCESS:
			return {
				...state,

				userData: action.payload,
				error: null,
				loading: false,
			}
		case authActionTypes.REGISTER_FAILURE:
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
