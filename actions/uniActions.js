import axios from 'axios'
import { uniActionTypes } from '../constants'
import { getAllUniversities, getUniversityById } from '../pages/api/data'

export const getUniversities = () => async (dispatch) => {
	try {
		dispatch({ type: uniActionTypes.GET_UNI_COURSES_REQUEST })
		const unis = await getAllUniversities()
		dispatch({ type: uniActionTypes.GET_UNIS_SUCCESS, payload: unis })
	} catch (error) {
		dispatch({
			type: uniActionTypes.GET_UNIS_FAILURE,
			payload: error.response?.data?.message ?? 'Something went wrong',
		})
	}
}

//get single uni
export const getUniversity = (id) => async (dispatch) => {
	try {
		dispatch({ type: uniActionTypes.GET_UNI_REQUEST })
		const uni = await await getUniversityById(id)
		dispatch({ type: uniActionTypes.GET_UNI_SUCCESS, payload: uni })
	} catch (error) {
		dispatch({
			type: uniActionTypes.GET_UNI_FAILURE,
			payload: error.response?.data?.message ?? 'Something went wrong',
		})
	}
}
