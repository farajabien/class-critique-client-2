import { authActionTypes } from '../constants'

const initialState = {
	token:
		typeof window !== 'undefined'
			? localStorage.getItem('classCritiqueToken')
			: null,
	user: null,
	error: null,
	expiresAt:
		typeof window !== 'undefined'
			? localStorage.getItem('classCritiqueExpiresAt')
			: null,
}

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case authActionTypes.LOGIN_REQUEST:
		case authActionTypes.REGISTER_REQUEST:
		case authActionTypes.LOGOUT_REQUEST:
			return {
				...state,
				token: null,
				user: null,
				error: null,
			}
		case authActionTypes.LOGIN_SUCCESS:
		case authActionTypes.REGISTER_SUCCESS:
			const expiresAt = action.payload.expiresAt
			localStorage.setItem('classCritiqueToken', action.payload.token)
			localStorage.setItem('classCritiqueExpiresAt', expiresAt)
			return {
				...state,
				expiresAt,
				token: action.payload.token,
				user: action.payload.user,
				error: null,
			}
		case authActionTypes.LOGIN_FAILURE:
		case authActionTypes.REGISTER_FAILURE:
		case authActionTypes.LOGOUT_FAILURE:
			return {
				...state,
				token: null,
				user: null,
				error: action.payload,
			}
		case authActionTypes.LOGOUT_SUCCESS:
			localStorage.removeItem('classCritiqueToken')
			localStorage.removeItem('classCritiqueExpiresAt')
			return {
				...state,
				token: null,
				user: null,
				error: null,
				expiresAt: null,
			}
		default:
			return state
	}
}
