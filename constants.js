// Uni routes
export const uniActionTypes = {
	GET_UNIS_REQUEST: 'GET_UNIS_REQUEST',
	GET_UNIS_SUCCESS: 'GET_UNIS_SUCCESS',
	GET_UNIS_FAILURE: 'GET_UNIS_FAILURE',
	GET_UNI_REQUEST: 'GET_UNI_REQUEST',
	GET_UNI_SUCCESS: 'GET_UNI_SUCCESS',
	GET_UNI_FAILURE: 'GET_UNI_FAILURE',
	GET_UNI_COURSES_REQUEST: 'GET_UNI_COURSES_REQUEST',
	GET_UNI_COURSES_SUCCESS: 'GET_UNI_COURSES_SUCCESS',
	GET_UNI_COURSES_FAILURE: 'GET_UNI_COURSES_FAILURE',
	GET_UNI_COURSE_REQUEST: 'GET_UNI_COURSE_REQUEST',
	GET_UNI_COURSE_SUCCESS: 'GET_UNI_COURSE_SUCCESS',
	GET_UNI_COURSE_FAILURE: 'GET_UNI_COURSE_FAILURE',
	CREATE_UNI_REQUEST: 'CREATE_UNI_REQUEST',
	CREATE_UNI_SUCCESS: 'CREATE_UNI_SUCCESS',
	CREATE_UNI_FAILURE: 'CREATE_UNI_FAILURE',
}

// Auth routes
export const authActionTypes = {
	LOGIN_REQUEST: 'LOGIN_REQUEST',
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
	LOGIN_FAILURE: 'LOGIN_FAILURE',
	REGISTER_REQUEST: 'REGISTER_REQUEST',
	REGISTER_SUCCESS: 'REGISTER_SUCCESS',
	REGISTER_FAILURE: 'REGISTER_FAILURE',
	GET_USER_DETAILS_REQUEST: 'GET_USER_DETAILS_REQUEST',
	GET_USER_DETAILS_SUCCESS: 'GET_USER_DETAILS_SUCCESS',
	GET_USER_DETAILS_FAILURE: 'GET_USER_DETAILS_FAILURE',
}

// Course routes
export const courseActionTypes = {
	GET_ALL_COURSES_REQUEST: 'GET_ALL_COURSES_REQUEST',
	GET_ALL_COURSES_SUCCESS: 'GET_ALL_COURSES_SUCCESS',
	GET_ALL_COURSES_FAILURE: 'GET_ALL_COURSES_FAILURE',
	GET_COURSE_REQUEST: 'GET_COURSE_REQUEST',
	GET_COURSE_SUCCESS: 'GET_COURSE_SUCCESS',
	GET_COURSE_FAILURE: 'GET_COURSE_FAILURE',

	GET_ALL_COURSES_FOR_UNI_REQUEST: 'GET_ALL_COURSES_FOR_UNI_REQUEST',
	GET_ALL_COURSES_FOR_UNI_SUCCESS: 'GET_ALL_COURSES_FOR_UNI_SUCCESS',
	GET_ALL_COURSES_FOR_UNI_FAILURE: 'GET_ALL_COURSES_FOR_UNI_FAILURE',
	GET_COURSE_FOR_UNI_REQUEST: 'GET_COURSE_FOR_UNI_REQUEST',
	GET_COURSE_FOR_UNI_SUCCESS: 'GET_COURSE_FOR_UNI_SUCCESS',
	GET_COURSE_FOR_UNI_FAILURE: 'GET_COURSE_FOR_UNI_FAILURE',

	GET_COURSE_FOR_LECTURER_REQUEST: 'GET_COURSE_FOR_LECTURER_REQUEST',
	GET_COURSE_FOR_LECTURER_SUCCESS: 'GET_COURSE_FOR_LECTURER_SUCCESS',
	GET_COURSE_FOR_LECTURER_FAILURE: 'GET_COURSE_FOR_LECTURER_FAILURE',
	GET_COURSE_FOR_LECTURER_UNI_REQUEST: 'GET_COURSE_FOR_LECTURER_UNI_REQUEST',
	GET_COURSE_FOR_LECTURER_UNI_SUCCESS: 'GET_COURSE_FOR_LECTURER_UNI_SUCCESS',
	GET_COURSE_FOR_LECTURER_UNI_FAILURE: 'GET_COURSE_FOR_LECTURER_UNI_FAILURE',

	CREATE_COURSE_REQUEST: 'CREATE_COURSE_REQUEST',
	CREATE_COURSE_SUCCESS: 'CREATE_COURSE_SUCCESS',
	CREATE_COURSE_FAILURE: 'CREATE_COURSE_FAILURE',
}

// Lecturer routes
export const lecturerActionTypes = {
	GET_ALL_LECTURERS_REQUEST: 'GET_ALL_LECTURERS_REQUEST',
	GET_ALL_LECTURERS_SUCCESS: 'GET_ALL_LECTURERS_SUCCESS',
	GET_ALL_LECTURERS_FAILURE: 'GET_ALL_LECTURERS_FAILURE',
	GET_LECTURER_REQUEST: 'GET_LECTURER_REQUEST',

	GET_LECTURER_SUCCESS: 'GET_LECTURER_SUCCESS',
	GET_LECTURER_FAILURE: 'GET_LECTURER_FAILURE',

	GET_ALL_LECTURERS_FOR_UNI_REQUEST: 'GET_ALL_LECTURERS_FOR_UNI_REQUEST',
	GET_ALL_LECTURERS_FOR_UNI_SUCCESS: 'GET_ALL_LECTURERS_FOR_UNI_SUCCESS',
	GET_ALL_LECTURERS_FOR_UNI_FAILURE: 'GET_ALL_LECTURERS_FOR_UNI_FAILURE',

	GET_LECTURER_FOR_UNI_REQUEST: 'GET_LECTURER_FOR_UNI_REQUEST',
	GET_LECTURER_FOR_UNI_SUCCESS: 'GET_LECTURER_FOR_UNI_SUCCESS',
	GET_LECTURER_FOR_UNI_FAILURE: 'GET_LECTURER_FOR_UNI_FAILURE',

	GET_ALL_LECTURERS_FOR_COURSE_REQUEST: 'GET_ALL_LECTURERS_FOR_COURSE_REQUEST',
	GET_ALL_LECTURERS_FOR_COURSE_SUCCESS: 'GET_ALL_LECTURERS_FOR_COURSE_SUCCESS',
	GET_ALL_LECTURERS_FOR_COURSE_FAILURE: 'GET_ALL_LECTURERS_FOR_COURSE_FAILURE',

	GET_LECTURER_FOR_COURSE_REQUEST: 'GET_LECTURER_FOR_COURSE_REQUEST',
	GET_LECTURER_FOR_COURSE_SUCCESS: 'GET_LECTURER_FOR_COURSE_SUCCESS',
	GET_LECTURER_FOR_COURSE_FAILURE: 'GET_LECTURER_FOR_COURSE_FAILURE',

	GET_LECTURER_FOR_LECTURER_REQUEST: 'GET_LECTURER_FOR_LECTURER_REQUEST',
	GET_LECTURER_FOR_LECTURER_SUCCESS: 'GET_LECTURER_FOR_LECTURER_SUCCESS',
	GET_LECTURER_FOR_LECTURER_FAILURE: 'GET_LECTURER_FOR_LECTURER_FAILURE',
	GET_LECTURER_FOR_LECTURER_UNI_REQUEST:
		'GET_LECTURER_FOR_LECTURER_UNI_REQUEST',
	GET_LECTURER_FOR_LECTURER_UNI_SUCCESS:
		'GET_LECTURER_FOR_LECTURER_UNI_SUCCESS',
	GET_LECTURER_FOR_LECTURER_UNI_FAILURE:
		'GET_LECTURER_FOR_LECTURER_UNI_FAILURE',

	CREATE_LECTURER_REQUEST: 'CREATE_LECTURER_REQUEST',
	CREATE_LECTURER_SUCCESS: 'CREATE_LECTURER_SUCCESS',
	CREATE_LECTURER_FAILURE: 'CREATE_LECTURER_FAILURE',

	UPDATE_LECTURER_REQUEST: 'UPDATE_LECTURER_REQUEST',
	UPDATE_LECTURER_SUCCESS: 'UPDATE_LECTURER_SUCCESS',
	UPDATE_LECTURER_FAILURE: 'UPDATE_LECTURER_FAILURE',
}

// Reviews routes
export const reviewActionTypes = {
	GET_ALL_REVIEWS_REQUEST: 'GET_ALL_REVIEWS_REQUEST',
	GET_ALL_REVIEWS_SUCCESS: 'GET_ALL_REVIEWS_SUCCESS',
	GET_ALL_REVIEWS_FAILURE: 'GET_ALL_REVIEWS_FAILURE',
	GET_REVIEW_REQUEST: 'GET_REVIEW_REQUEST',
	GET_REVIEW_SUCCESS: 'GET_REVIEW_SUCCESS',
	GET_REVIEW_FAILURE: 'GET_REVIEW_FAILURE',

	GET_ALL_REVIEWS_FOR_UNI_REQUEST: 'GET_ALL_REVIEWS_FOR_UNI_REQUEST',
	GET_ALL_REVIEWS_FOR_UNI_SUCCESS: 'GET_ALL_REVIEWS_FOR_UNI_SUCCESS',
	GET_ALL_REVIEWS_FOR_UNI_FAILURE: 'GET_ALL_REVIEWS_FOR_UNI_FAILURE',
	GET_REVIEW_FOR_UNI_REQUEST: 'GET_REVIEW_FOR_UNI_REQUEST',
	GET_REVIEW_FOR_UNI_SUCCESS: 'GET_REVIEW_FOR_UNI_SUCCESS',
	GET_REVIEW_FOR_UNI_FAILURE: 'GET_REVIEW_FOR_UNI_FAILURE',

	GET_ALL_REVIEWS_FOR_COURSE_REQUEST: 'GET_ALL_REVIEWS_FOR_COURSE_REQUEST',
	GET_ALL_REVIEWS_FOR_COURSE_SUCCESS: 'GET_ALL_REVIEWS_FOR_COURSE_SUCCESS',
	GET_ALL_REVIEWS_FOR_COURSE_FAILURE: 'GET_ALL_REVIEWS_FOR_COURSE_FAILURE',

	GET_REVIEW_FOR_COURSE_REQUEST: 'GET_REVIEW_FOR_COURSE_REQUEST',
	GET_REVIEW_FOR_COURSE_SUCCESS: 'GET_REVIEW_FOR_COURSE_SUCCESS',
	GET_REVIEW_FOR_COURSE_FAILURE: 'GET_REVIEW_FOR_COURSE_FAILURE',

	GET_REVIEW_FOR_LECTURER_REQUEST: 'GET_REVIEW_FOR_LECTURER_REQUEST',
	GET_REVIEW_FOR_LECTURER_SUCCESS: 'GET_REVIEW_FOR_LECTURER_SUCCESS',
	GET_REVIEW_FOR_LECTURER_FAILURE: 'GET_REVIEW_FOR_LECTURER_FAILURE',

	GET_REVIEW_FOR_LECTURER_UNI_REQUEST: 'GET_REVIEW_FOR_LECTURER_UNI_REQUEST',
	GET_REVIEW_FOR_LECTURER_UNI_SUCCESS: 'GET_REVIEW_FOR_LECTURER_UNI_SUCCESS',
	GET_REVIEW_FOR_LECTURER_UNI_FAILURE: 'GET_REVIEW_FOR_LECTURER_UNI_FAILURE',

	CREATE_REVIEW_REQUEST: 'CREATE_REVIEW_REQUEST',
	CREATE_REVIEW_SUCCESS: 'CREATE_REVIEW_SUCCESS',
	CREATE_REVIEW_FAILURE: 'CREATE_REVIEW_FAILURE',
}
