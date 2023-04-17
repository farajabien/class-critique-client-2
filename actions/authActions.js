//authactions, refer authReducer.js
import { authActionTypes } from '../constants'
import { loginUser, registerUser } from '../pages/api/data'

export const signup = (userData) => async (dispatch) => {
	try {
		const response = await axios.post('/api/auth/signup', userData)
		const { token, user } = response.data
		dispatch({ type: 'SIGNUP_SUCCESS', payload: { token, user } })
	} catch (error) {
		dispatch({ type: 'SIGNUP_FAILURE', payload: error.response.data.error })
	}
}

export const login = (userData, isModal) => async (dispatch) => {
	try {
		dispatch({ type: authActionTypes.LOGIN_REQUEST })
		const response = await loginUser(userData, isModal)
		if (response.error) {
			throw new Error(response.error)
		}
		const { user, token, expiresAt } = response
		dispatch({
			type: authActionTypes.LOGIN_SUCCESS,
			payload: { user, token, expiresAt, isModal },
		})
	} catch (error) {
		console.log(error)
		dispatch({
			type: authActionTypes.LOGIN_FAILURE,
			payload: error.message ?? 'Something went wrong logging in',
		})
	}
}

//register
export const register = (userData) => async (dispatch) => {
	try {
		dispatch({ type: authActionTypes.LOGOUT_REQUEST })
		const user = await registerUser(userData)
		dispatch({ type: authActionTypes.REGISTER_SUCCESS, payload: user })
	} catch (error) {
		dispatch({
			type: authActionTypes.REGISTER_FAILURE,
			payload:
				error.response?.data?.error ?? 'Something went wrong registering',
		})
	}
}

export const logout = () => async (dispatch) => {
	try {
		dispatch({ type: authActionTypes.LOGOUT_REQUEST })
		dispatch({ type: authActionTypes.LOGOUT_SUCCESS })
	} catch (error) {
		dispatch({
			type: authActionTypes.LOGOUT_FAILURE,
			payload:
				error.response?.data?.error ?? 'Something went wrong registering',
		})
	}
}
