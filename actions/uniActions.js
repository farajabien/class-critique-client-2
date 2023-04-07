import axios from 'axios'
import { uniActionTypes } from '../constants'
import { getAllUniversities, createUniversity } from '../pages/api/data'

export const getUniversities = () => async (dispatch) => {
	try {
		dispatch({ type: uniActionTypes.GET_UNI_COURSES_REQUEST })
		const unis = await getAllUniversities()
		dispatch({ type: uniActionTypes.GET_UNIS_SUCCESS, payload: unis })
	} catch (error) {
		dispatch({
			type: uniActionTypes.GET_UNIS_FAILURE,
			payload: error.response.data.message,
		})
	}
}

//get single uni
export const getUniversity = (id) => async (dispatch) => {
	try {
		dispatch({ type: uniActionTypes.GET_UNI_REQUEST })
		const uni = await axios.get(`/api/universities/${id}`)
		dispatch({ type: uniActionTypes.GET_UNI_SUCCESS, payload: uni })
	} catch (error) {
		dispatch(
			getUniFailure({
				type: uniActionTypes.GET_UNI_FAILURE,
				payload: error.response.data.message,
			})
		)
	}
}

export const addUniversity = (universityData) => async (dispatch) => {
	try {
		dispatch({ type: uniActionTypes.CREATE_UNI_REQUEST })
		const newUni = await createUniversity(universityData)
		dispatch({
			type: uniActionTypes.CREATE_UNI_SUCCESS,
			payload: newUni,
		})
	} catch (error) {
		dispatch({
			type: uniActionTypes.CREATE_UNI_FAILURE,
			payload: error.response.data.message,
		})
	}
}
