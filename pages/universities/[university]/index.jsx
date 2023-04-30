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
import {
	FaFileAlt,
	FaLocationArrow,
	FaSearch,
	FaStar,
	FaUniversity,
	FaUser,
} from 'react-icons/fa'
import LoadingScreen from '../../../components/molecules/LoadingScreen'
import AddLecturerModal from '../../../components/lecturers/AddLecturerModal'
import AddCourseModal from '../../../components/courses/AddCourseModal'
import { motion } from 'framer-motion'
import { useUser } from '@clerk/nextjs'
import { getUniversity } from '../../../actions/uniActions'
import Link from 'next/link'

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

	const { selectedUni: university, loading: uniLoading } = useSelector(
		(state) => state.uniReducer
	)
	const loading = useSelector((state) => state.uniReducer.loading)

	useEffect(() => {
		if (uniId) {
			dispatch(getUniversity(uniId))
		}
	}, [dispatch, uniId])

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

	console.log('')
	const sortLecturers = (lecturers) => {
		const lecturersWithAvgRating = lecturers.map((lecturer) => {
			// Calculate the average rating for this lecturer

			const totalRating =
				lecturer.avgCoolness +
				lecturer.avgGrading +
				lecturer.avgWorkload +
				lecturer.avgExpertise +
				lecturer.avgRWA
			const avgRating = totalRating / 5

			// Add the average rating to the lecturer object
			return { ...lecturer, avgRating }
		})

		// Sort the lecturers by their average rating in descending order
		const sortedLecturers = lecturersWithAvgRating.sort(
			(a, b) => b.avgRating - a.avgRating
		)

		return sortedLecturers
	}

	const sortedLecturers = sortLecturers(lecturers)
	const filteredLecturers = sortedLecturers.filter((lecturer) =>
		lecturer.name.toLowerCase().includes(searchQuery.toLowerCase())
	)
	return (
		<div className='bg-gray-100 min-h-screen'>
			<div className='bg-white'>
				<div className='container mx-auto px-4'>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1, duration: 1 }}
						className='bg-white py-2'>
						{courseLoading ? (
							<LoadingScreen />
						) : (
							<div className='mx-auto px-4'>
								{uniLoading && <LoadingScreen />}
								{!loading && university && (
									<div className=''>
										<div className=' space-x-4'>
											<div className='flex items-center mb-2 mt-2'>
												<FaUniversity className='text-teal-500 text-3xl mr-2' />
												<h2 className='text-2xl font-bold text-gray-800'>
													{university.name}
												</h2>
											</div>
										</div>
										<div>
											<FaLocationArrow className='text-teal-500 text-normal inline-block mr-2' />
											<p className='text-gray-700 inline-block'>
												{university.location}
											</p>
										</div>
									</div>
								)}
							</div>
						)}
					</motion.div>
					<div className='mt-2'>
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
					<div className='mt-2'>
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

			<div className='container mx-auto px-4 mt-4'>
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
							<>
								{sortedLecturers?.map((lecturer, idx) => (
									<>
										<div
											className={`w-full md:w-2/3 lg:w-1/3 mx-auto shadow-lg rounded-lg p-4 mb-2 ${
												idx + 1 === 1
													? 'bg-teal-500 hover:bg-teal-600 transition duration-300 ease-in-out'
													: 'bg-white hover:bg-gray-100 transition duration-300 ease-in-out'
											} `}
											// onClick={handleModal}
										>
											<div className='flex flex-row items-center justify-between'>
												<div className='flex items-center'>
													<div className='flex-shrink-0 font-bold mr-4 text-sm bg-gray-200 rounded-full py-1 px-2'>
														{idx + 1}
													</div>
													<div className='flex flex-col'>
														<h2
															className={`font-bold ${
																idx + 1 === 1 ? 'text-lg' : 'text-base'
															}`}>
															{lecturer.name}
														</h2>
														<div
															className={`flex items-center text-gray-500 text-xs ml-1 ${
																idx + 1 === 1 ? 'text-white' : ''
															}`}>
															<FaUser className='inline mr-1' />
															{/* {reviews.length ?? 0} ratings */}
														</div>
													</div>
												</div>
												<div className='flex items-center'>
													<span className='text-yellow-400 text-xs mr-1'>
														<FaStar />
													</span>
													<p
														className={`font-bold ${
															idx + 1 === 1 ? 'text-lg' : 'text-base'
														}`}>
														{typeof lecturer.avgRating === 'number'
															? lecturer.avgRating.toFixed(1)
															: 'N/A'}
													</p>
												</div>
											</div>
										</div>
									</>
								))}
							</>
						)}
					</>
				)}
			</div>
		</div>
	)
}
