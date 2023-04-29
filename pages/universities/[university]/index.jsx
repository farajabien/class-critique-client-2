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
import LoadingScreen from '../../../components/molecules/LoadingScreen'
import AddLecturerModal from '../../../components/lecturers/AddLecturerModal'
import AddCourseModal from '../../../components/courses/AddCourseModal'
import { motion } from 'framer-motion'
import { useUser } from '@clerk/nextjs'

export default function UniversityDetails() {
	const router = useRouter()
	const { university: uniId } = router.query
	const [searchQuery, setSearchQuery] = useState('')
	const [viewMode, setViewMode] = useState('courses')
	const dispatch = useDispatch()
	const courses = useSelector((state) => state.courseReducer.uniCourses)
	const lecturers = useSelector((state) => state.lecturerReducer.uniLecturers)
	const courseLoading = useSelector((state) => state.courseReducer.loading)
	const lecLoading = useSelector((state) => state.lecturerReducer.loading)

	const error = useSelector((state) => state.courseReducer.error)

	const { user, isLoading } = useUser()

	const isAdmin = user?.publicMetadata.role === 'admin'
	const isUniAdmin = user?.publicMetadata.role === 'universityAdmin'
	const canAdd = isAdmin || isUniAdmin

	const [showAddLecModal, setShowAddLecModal] = useState(false)
	const [showAddCourseModal, setShowAddCourseModal] = useState(false)
	// lecturer.averageRating = 4.5

	const handleAddLecModal = () => {
		setShowAddLecModal(!showAddLecModal)
	}

	const handleAddCourseModal = () => {
		setShowAddCourseModal(!showAddCourseModal)
	}

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

	const filteredCourses = courses.filter(
		(course) =>
			course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			course.code.toLowerCase().includes(searchQuery.toLowerCase())
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
							placeholder={`Search ${
								viewMode === 'courses' ? 'Courses' : 'Lecturers'
							}`}
							onChange={handleSearch}
							searchIcon={<FaSearch className='h-6 w-6 m-auto' />}
						/>
					</div>
					{canAdd && showAddLecModal && (
						<AddLecturerModal
							showAddLecModal={showAddLecModal}
							handleAddLecModal={handleAddLecModal}
							uniId={uniId}
							user={user}
						/>
					)}

					{canAdd && showAddCourseModal && (
						<AddCourseModal
							showAddCourseModal={showAddCourseModal}
							handleAddCourseModal={handleAddCourseModal}
							uniId={uniId}
							user={user}
						/>
					)}
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
								Courses ({courses?.length ?? 0})
							</button>
							{canAdd && (
								<div className='mt-4 flex justify-center'>
									<motion.button
										className='bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 1, duration: 1 }}
										onClick={handleAddCourseModal}>
										Add Course
									</motion.button>
									<motion.button
										className='bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 1, duration: 1 }}
										onClick={handleAddLecModal}>
										Add Lecturer
									</motion.button>
								</div>
							)}
							<button
								className={`px-4 py-2 font-medium text-sm rounded-md ${
									viewMode === 'lecturers'
										? 'bg-teal-500 text-white'
										: 'text-gray-500'
								}`}
								onClick={() => handleViewMode('lecturers')}>
								<IoMdPeople className='inline-block mr-2 text-lg' />
								Lecturers ({lecturers?.length ?? 0})
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='container mx-auto px-4 mt-8'>
				{viewMode === 'courses' ? (
					<>
						{courseLoading ? (
							<LoadingScreen />
						) : (
							<CourseList
								courses={filteredCourses}
								loading={courseLoading}
								error={error}
								uniId={uniId}
							/>
						)}
					</>
				) : (
					<>
						{lecLoading ? (
							<LoadingScreen />
						) : (
							<LecturerList
								lecturers={filteredLecturers}
								loading={lecLoading}
								error={error}
							/>
						)}
					</>
				)}
			</div>
		</div>
	)
}
