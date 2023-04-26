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
				user: null,
				error: null,
				loading: true,
			}
		case authActionTypes.REGISTER_SUCCESS:
			return {
				...state,

				user: action.payload,
				error: null,
				loading: false,
			}
		case authActionTypes.REGISTER_FAILURE:
			return {
				...state,
				user: null,
				error: action.payload,
				loading: false,
			}

		default:
			return state
	}
}
