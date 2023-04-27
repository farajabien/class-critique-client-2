//authactions, refer authReducer.js
import { authActionTypes } from '../constants'
import { registerClerkUser } from '../pages/api/data'

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
