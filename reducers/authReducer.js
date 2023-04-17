import { authActionTypes } from '../constants'
import router from 'next/router'

const initialState = {
	loading: false,
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
				loading: true,
			}
		case authActionTypes.LOGIN_SUCCESS:
		case authActionTypes.REGISTER_SUCCESS:
			localStorage.setItem('classCritiqueToken', action.payload.token)
			localStorage.setItem('classCritiqueExpiresAt', action.payload.expiresAt)

			if (!action.payload.isModal?.isModal) {
				router.push(`/universities/${action.payload.user.university}`)
			}

			return {
				...state,
				expiresAt: action.payload.expiresAt,
				token: action.payload.token,
				user: action.payload.user,
				error: null,
				loading: false,
			}
		case authActionTypes.LOGIN_FAILURE:
		case authActionTypes.REGISTER_FAILURE:
		case authActionTypes.LOGOUT_FAILURE:
			return {
				...state,
				token: null,
				user: null,
				error: action.payload,
				loading: false,
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
				loading: false,
			}
		default:
			return state
	}
}
