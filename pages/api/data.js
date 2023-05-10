import axios from 'axios'

//registerClerkUser
export const registerClerkUser = async (userData) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register-clerk-user`,
			userData
		)
		return response.data
	} catch (error) {
		console.error('Error while registering user', error)
		throw error
	}
}

//getUserDetailsData
export const getUserDetailsData = async (userId) => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/${userId}`
		)
		return response.data
	} catch (error) {
		console.error('Error while getting user details', error)
		throw error
	}
}

export const getAllUniversities = async () => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/universities`
		)
		return response.data
	} catch (error) {
		console.error('Error while fetching universities', error)
		throw error
	}
}

export const getUniversityById = async (id) => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/universities/${id}`
		)
		return response.data
	} catch (error) {
		console.error('Error while fetching university', error)
		throw error
	}
}

export const createUniversity = async (user, uniData) => {
	try {
		if (user.publicMetadata.role !== 'admin') {
			throw new Error('Unauthorized access')
		}

		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/universities`,
			{ user, uniData }
		)
		return response.data
	} catch (error) {
		console.error('Error while creating university', error)
		throw error
	}
}

export const getAllCourses = async () => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/courses`
		)
		return response.data
	} catch (error) {
		console.error('Error while fetching courses', error)
		throw error
	}
}

export const getCoursesByUniId = async (uniId) => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/universities/${uniId}/courses`
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
				`${process.env.NEXT_PUBLIC_BASE_URL}/universities/${uniId}/courses/${courseId}`
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
				`${process.env.NEXT_PUBLIC_BASE_URL}/universities/${uniId}/lecturers`
			)
			return response.data
		} catch (error) {
			console.error('Error while fetching lecturers', error)
			throw error
		}
	}
}

//Reviews

//getAllReviews
export const getAllReviews = async () => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`
		)
		return response.data
	} catch (error) {
		console.error('Error while fetching reviews', error)
		throw error
	}
}
// getAllReviewsForCourse
export const getAllReviewsForCourse = async (courseId) => {
	if (courseId) {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/courses/${courseId}`
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
				`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/lecturers/${lecturerId}`
			)
			return response.data
		} catch (error) {
			console.error('Error while fetching reviews for lec', error)
			throw error
		}
	}
}

//addNewReview
export const addNewReview = async (courseId, review, userId) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/courses/${courseId}/${userId}`,
			review
		)
		return response.data
	} catch (error) {
		console.error('Error while creating review', error)
		throw error
	}
}

//LECTURERS
// getAllLecturers
export const getAllLecturers = async () => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/lecturers`
		)
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
				`${process.env.NEXT_PUBLIC_BASE_URL}/lecturers/${uniId}/${courseId}`
			)
			return response.data
		} catch (error) {
			console.error('Error while fetching lecturers for course', error)
			throw error
		}
	}
}

//addNewLecturer
export const addNewLecturer = async (user, uniId, lecturer) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/lecturers`,
			{ user, uniId, lecturer }
		)
		return response.data
	} catch (error) {
		console.error('Error while creating lecturer', error)
		throw error
	}
}

//updateSingleLecturer
export const updateSingleLecturer = async (user, uniId, lecturer) => {
	try {
		const response = await axios.put(
			`${process.env.NEXT_PUBLIC_BASE_URL}/lecturers/${uniId}`,
			{ user, uniId, lecturer }
		)
		return response.data
	} catch (error) {
		console.error('Error while updating lecturer', error)
		throw error
	}
}

//addNewCourse
export const addNewCourse = async (user, uniId, course) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/universities/${uniId}`,
			{ user, uniId, course }
		)
		return response.data
	} catch (error) {
		console.error('Error while creating course', error)
		throw error
	}
}
