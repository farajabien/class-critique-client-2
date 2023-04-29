//authactions, refer authReducer.js
import { authActionTypes } from '../constants'
import { registerClerkUser, getUserDetailsData } from '../pages/api/data'

//register
export const register = (userData) => async (dispatch) => {
	try {
		dispatch({ type: authActionTypes.REGISTER_REQUEST })
		const { user } = await registerClerkUser(userData)

		dispatch({ type: authActionTypes.REGISTER_SUCCESS, payload: user })
	} catch (error) {
		dispatch({
			type: authActionTypes.REGISTER_FAILURE,
			payload:
				error.response?.data?.error ?? 'Something went wrong registering',
		})
	}
}

//getUserDetails

export const getUserDetails = (clerk_id) => async (dispatch) => {
	try {
		dispatch({ type: authActionTypes.GET_USER_DETAILS_REQUEST })
		const { user } = await getUserDetailsData(clerk_id)

		dispatch({ type: authActionTypes.GET_USER_DETAILS_SUCCESS, payload: user })
	} catch (error) {
		dispatch({
			type: authActionTypes.GET_USER_DETAILS_FAILURE,
			payload:
				error.response?.data?.error ??
				'Something went wrong getting user details',
		})
	}
}
