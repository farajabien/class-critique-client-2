import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001'

export const getAllUniversities = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/universities`)
		return response.data
	} catch (error) {
		console.error('Error while fetching universities', error)
		throw error
	}
}

export const getUniversity = async (id) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/universities/${id}`)
		return response.data
	} catch (error) {
		console.error('Error while fetching university', error)
		throw error
	}
}

export const createUniversity = async (universityData) => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/universities`,
			universityData
		)
		return response.data
	} catch (error) {
		console.error('Error while creating university', error)
		throw error
	}
}

export const getAllCourses = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/courses`)
		return response.data
	} catch (error) {
		console.error('Error while fetching courses', error)
		throw error
	}
}
