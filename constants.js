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
	SIGNUP_REQUEST: 'SIGNUP_REQUEST',
	SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
	SIGNUP_FAILURE: 'SIGNUP_FAILURE',
}

// Lecturer routes
export const lecturerActionTypes = {
	GET_LECTURERS_REQUEST: 'GET_LECTURERS_REQUEST',
	GET_LECTURERS_SUCCESS: 'GET_LECTURERS_SUCCESS',
	GET_LECTURERS_FAILURE: 'GET_LECTURERS_FAILURE',
	CREATE_LECTURER_REQUEST: 'CREATE_LECTURER_REQUEST',
	CREATE_LECTURER_SUCCESS: 'CREATE_LECTURER_SUCCESS',
	CREATE_LECTURER_FAILURE: 'CREATE_LECTURER_FAILURE',
	GET_LECTURERS_UNIVERSITY_REQUEST: 'GET_LECTURERS_UNIVERSITY_REQUEST',
	GET_LECTURERS_UNIVERSITY_SUCCESS: 'GET_LECTURERS_UNIVERSITY_SUCCESS',
	GET_LECTURERS_UNIVERSITY_FAILURE: 'GET_LECTURERS_UNIVERSITY_FAILURE',
	GET_LECTURER_REQUEST: 'GET_LECTURER_REQUEST',
	GET_LECTURER_SUCCESS: 'GET_LECTURER_SUCCESS',
	GET_LECTURER_FAILURE: 'GET_LECTURER_FAILURE',
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

// Rating routes
export const ratingActionTypes = {
	GET_RATINGS_REQUEST: 'GET_RATINGS_REQUEST',
	GET_RATINGS_SUCCESS: 'GET_RATINGS_SUCCESS',
	GET_RATINGS_FAILURE: 'GET_RATINGS_FAILURE',
	GET_RATING_REQUEST: 'GET_RATING_REQUEST',
	GET_RATING_SUCCESS: 'GET_RATING_SUCCESS',
	GET_RATING_FAILURE: 'GET_RATING_FAILURE',
	GET_LECTURER_RATINGS_REQUEST: 'GET_LECTURER_RATINGS_REQUEST',
	GET_LECTURER_RATINGS_SUCCESS: 'GET_LECTURER_RATINGS_SUCCESS',
	GET_LECTURER_RATINGS_FAILURE: 'GET_LECTURER_RATINGS_FAILURE',
	GET_LECTURER_RATINGS_COURSE_REQUEST: 'GET_LECTURER_RATINGS_COURSE_REQUEST',
	GET_LECTURER_RATINGS_COURSE_SUCCESS: 'GET_LECTURER_RATINGS_COURSE_SUCCESS',
	GET_LECTURER_RATINGS_COURSE_FAILURE: 'GET_LECTURER_RATINGS_COURSE_FAILURE',
	GET_COURSE_RATINGS_REQUEST: 'GET_COURSE_RATINGS_REQUEST',
	GET_COURSE_RATINGS_SUCCESS: 'GET_COURSE_RATINGS_SUCCESS',
	GET_COURSE_RATINGS_FAILURE: 'GET_COURSE_RATINGS_FAILURE',
}