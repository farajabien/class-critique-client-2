import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getCoursesByUni } from '../../../actions/courseActions'
import { getLecturersByUni } from '../../../actions/lecturerActions'
import SearchBar from '../../../components/molecules/SearchBar'
import { FaSearch } from 'react-icons/fa'
import UniversityInfo from '../../../components/universities/UniversityInfo'
import CourseList from '../../../components/courses/CourseList'
import LecturerList from '../../../components/lecturers/LecturerList'

export default function UniversityDetails() {
	const router = useRouter()
	const { university: uniId } = router.query
	const [searchQuery, setSearchQuery] = useState('')
	const [viewMode, setViewMode] = useState('courses')
	const dispatch = useDispatch()
	const courses = useSelector((state) => state.courseReducer.uniCourses)
	const lecturers = useSelector((state) => state.lecturerReducer.uniLecturers)
	const loading = useSelector((state) => state.courseReducer.loading)
	const error = useSelector((state) => state.courseReducer.error)

	useEffect(() => {
		if (uniId) {
			dispatch(getCoursesByUni(uniId))
			dispatch(getLecturersByUni(uniId))
		}
	}, [dispatch, uniId])

	const handleSearch = (query) => {
		setSearchQuery(query)
	}

	const handleViewMode = (mode) => {
		setViewMode(mode)
	}

	const filteredCourses = courses.filter((course) =>
		course.name.toLowerCase().includes(searchQuery.toLowerCase())
	)
	const filteredLecturers = lecturers.filter((lecturer) =>
		lecturer.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<div className='min-h-screen bg-gray-100'>
			<div className='px-4 py-8 md:flex md:justify-between'>
				<div className='mb-8 md:mb-0 lg:w-1/3'>
					<UniversityInfo uniId={uniId} />
				</div>
				<div className='lg:w-2/3'>
					<SearchBar
						placeholder='Search for courses or lecturers'
						searchIcon={<FaSearch className='h-6 w-6 m-auto' />}
						onChange={handleSearch}
						value={searchQuery}
					/>
					{searchQuery.length > 0 && (
						<p className='my-2 text-normal text-center'>
							{viewMode === 'courses'
								? `${filteredCourses.length} courses found.`
								: `${filteredLecturers.length} lecturers found.`}
						</p>
					)}
					{loading ? (
						<p className='text-center my-8'>Loading...</p>
					) : error ? (
						<p className='text-center my-8'>{error}</p>
					) : viewMode === 'courses' ? (
						<>
							<CourseList courses={filteredCourses} />
						</>
					) : (
						<>
							<LecturerList lecturers={filteredLecturers} />
						</>
					)}
				</div>
			</div>
		</div>
	)
}
