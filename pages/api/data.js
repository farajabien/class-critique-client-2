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

export const getUniversityById = async (id) => {
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

export const getCoursesByUniId = async (uniId) => {
	try {
		const response = await axios.get(
			`${API_BASE_URL}/universities/${uniId}/courses`
		)
		return response.data
	} catch (error) {
		console.error('Error while fetching courses', error)
		throw error
	}
}

export const getCourseByUniIdCourseId = async (uniId, courseId) => {
	if (uniId && courseId) {
		try {
			const response = await axios.get(
				`${API_BASE_URL}/universities/${uniId}/courses/${courseId}`
			)
			return response.data
		} catch (error) {
			console.error('Error while fetching course', error)
			throw error
		}
	}
}

export const getLecturersByUniId = async (uniId) => {
	if (uniId) {
		try {
			const response = await axios.get(
				`${API_BASE_URL}/universities/${uniId}/lecturers`
			)
			return response.data
		} catch (error) {
			console.error('Error while fetching lecturers', error)
			throw error
		}
	}
}

//Reviews
// getAllReviewsForCourse
export const getAllReviewsForCourse = async (courseId) => {
	if (courseId) {
		try {
			const response = await axios.get(
				`${API_BASE_URL}/reviews/courses/${courseId}`
			)
			return response.data
		} catch (error) {
			console.error('Error while fetching reviews for course', error)
			throw error
		}
	}
}

// getAllReviewsForLecturer
export const getAllReviewsForLecturer = async (lecturerId, courseId) => {
	if (courseId && lecturerId) {
		try {
			const response = await axios.get(
				`${API_BASE_URL}/reviews/lecturers/${lecturerId}`
			)
			return response.data
		} catch (error) {
			console.error('Error while fetching reviews for lec', error)
			throw error
		}
	}
}

//LECTURERS
// getAllLecturers
export const getAllLecturers = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/lecturers`)
		return response.data
	} catch (error) {
		console.error('Error while fetching lecturers', error)
		throw error
	}
}

// getAllLecturersForCourse
export const getAllLecturersForCourse = async (uniId, courseId) => {
	if ((uniId, courseId)) {
		try {
			const response = await axios.get(
				`${API_BASE_URL}/lecturers/${uniId}/${courseId}`
			)
			return response.data
		} catch (error) {
			console.error('Error while fetching lecturers for course', error)
			throw error
		}
	}
}
