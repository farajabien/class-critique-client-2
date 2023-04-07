import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getCoursesByUni,
	getCourseByUniCourse,
} from '../../../../../actions/courseActions'

export default function CourseDetails() {
	const router = useRouter()
	const { university: uniId, course: courseId } = router.query
	const [searchQuery, setSearchQuery] = useState('')
	const dispatch = useDispatch()
	const course = useSelector((state) => state.courseReducer.selectedUniCourse)
	const lecturers = useSelector((state) => state.lecturerReducer.uniLecturers)
	const loading = useSelector((state) => state.courseReducer.loading)
	const error = useSelector((state) => state.courseReducer.error)

	//destructure course
	const {
		name,
		description,
		level,
		university,
		lecturers: lecturerIds,
		ratings,
	} = course

	useEffect(() => {
		if (uniId && courseId) {
			dispatch(getCourseByUniCourse(uniId, courseId))
		}
	}, [courseId, dispatch, uniId])

	const handleSearch = (query) => {
		setSearchQuery(query)
	}

	const handleViewMode = (mode) => {
		setViewMode(mode)
	}

	return <div className='min-h-screen bg-gray-100'></div>
}
