import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getCoursesByUni } from '../../../actions/courseActions'
import { getLecturersByUni } from '../../../actions/lecturerActions'
import SearchBar from '../../../components/molecules/SearchBar'
import UniversityInfo from '../../../components/universities/UniversityInfo'
import CourseList from '../../../components/courses/CourseList'
import LecturerList from '../../../components/lecturers/LecturerList'
import { IoMdSchool, IoMdPeople } from 'react-icons/io'
import { FaSearch } from 'react-icons/fa'

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
		<div className='bg-gray-100 min-h-screen'>
			<div className='bg-white py-6'>
				<div className='container mx-auto px-4'>
					<UniversityInfo uniId={uniId} />
					<div className='mt-8'>
						<SearchBar
							onChange={handleSearch}
							placeholder={`Search ${
								viewMode === 'courses' ? 'Courses' : 'Lecturers'
							}`}
							Icon={FaSearch}
						/>
					</div>
					<div className='mt-8'>
						<div className='flex justify-between items-center'>
							<button
								className={`px-4 py-2 font-medium text-sm rounded-md mr-2 ${
									viewMode === 'courses'
										? 'bg-teal-500 text-white'
										: 'text-gray-500'
								}`}
								onClick={() => handleViewMode('courses')}>
								<IoMdSchool className='inline-block mr-2 text-lg' />
								Courses
							</button>
							<button
								className={`px-4 py-2 font-medium text-sm rounded-md ${
									viewMode === 'lecturers'
										? 'bg-teal-500 text-white'
										: 'text-gray-500'
								}`}
								onClick={() => handleViewMode('lecturers')}>
								<IoMdPeople className='inline-block mr-2 text-lg' />
								Lecturers
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='container mx-auto px-4 mt-8'>
				{viewMode === 'courses' ? (
					<CourseList
						courses={filteredCourses}
						loading={loading}
						error={error}
					/>
				) : (
					<LecturerList
						lecturers={filteredLecturers}
						loading={loading}
						error={error}
					/>
				)}
			</div>
		</div>
	)
}
