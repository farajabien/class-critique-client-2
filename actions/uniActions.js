import axios from 'axios'
import { uniActionTypes } from '../constants'
import {
	getAllUniversities,
	getUniversityById,
	createUniversity,
} from '../pages/api/data'

export const getUniversities = () => async (dispatch) => {
	try {
		dispatch({ type: uniActionTypes.GET_UNIS_REQUEST })
		const unis = await getAllUniversities()
		dispatch({ type: uniActionTypes.GET_UNIS_SUCCESS, payload: unis })
	} catch (error) {
		dispatch({
			type: uniActionTypes.GET_UNIS_FAILURE,
			payload:
				error.response?.data?.message ??
				'Something went wrong getting all unis',
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
			payload:
				error.response?.data?.message ?? 'Something went wrong getting uni',
		})
	}
}

//addUni
export const addUni = (token, uniData) => async (dispatch) => {
	try {
		console.log('UNI DATA', uniData)
		dispatch({ type: uniActionTypes.CREATE_UNI_REQUEST })
		const uni = await await createUniversity(token, uniData)
		dispatch({ type: uniActionTypes.CREATE_UNI_SUCCESS, payload: uni })
	} catch (error) {
		dispatch({
			type: uniActionTypes.CREATE_UNI_FAILURE,
			payload:
				error.response?.data?.message ?? 'Something went wrong adding uni',
		})
	}
}
