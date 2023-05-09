import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseByUniCourse } from '../../../../../actions/courseActions'

import SearchBar from '../../../../../components/molecules/SearchBar'
import { FaFileAlt, FaSearch } from 'react-icons/fa'
import Rankings from '../../../../../components/lecturers/Rankings'
import CourseSummary from '../../../../../components/courses/CourseSummary'
import LoadingScreen from '../../../../../components/molecules/LoadingScreen'
import Link from 'next/link'
import { getCourseLecturers } from '../../../../../actions/lecturerActions'
import { getReviewsForCourse } from '../../../../../actions/reviewActions'
import { useUser } from '@clerk/nextjs'
import { getUserDetails } from '../../../../../actions/authActions'
import { motion } from 'framer-motion'

const CourseDetails = () => {
	const router = useRouter()
	const { university: uniId, course: courseId } = router.query
	const [searchQuery, setSearchQuery] = useState('')
	const dispatch = useDispatch()
	const course = useSelector((state) => state.courseReducer.selectedUniCourse)
	const university = useSelector((state) => state.uniReducer.selectedUni)
	const lecturers = useSelector(
		(state) => state.lecturerReducer.courseLecturers
	)

	const courseLoading = useSelector((state) => state.courseReducer.loading)
	const lecLoading = useSelector((state) => state.lecturerReducer.loading)
	const error = useSelector((state) => state.courseReducer.error)

	const reviews = useSelector((state) => state.reviewReducer.courseReviews)
	const reviewLoading = useSelector((state) => state.reviewReducer.loading)
	const reviewError = useSelector((state) => state.reviewReducer.error)

	const [openLecModalFromReview, setOpenLecModalFromReview] = useState(false)

	const { user, isLoading } = useUser()
	const { userData, error: userDataError } = useSelector(
		(state) => state.authReducer
	)

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

	useEffect(() => {
		if (user) {
			dispatch(getUserDetails(user.id))
		}
	}, [dispatch, user])

	useEffect(() => {
		if (uniId && courseId) {
			dispatch(getCourseByUniCourse(uniId, courseId))
			dispatch(getCourseLecturers(uniId, courseId))
			dispatch(getReviewsForCourse(courseId))
		}
	}, [courseId, dispatch, uniId])

	const handleSearch = (query) => {
		setSearchQuery(query)
	}

	if (error) {
		return <div className='m-5'>{error}</div>
	}

	if (userDataError) {
		return <div className='m-5'>{userDataError}</div>
	}

	return (
		<div className='bg-gray-100 min-h-screen'>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 1 }}
				className='bg-white py-2'>
				{courseLoading ? (
					<LoadingScreen />
				) : (
					<div className='mx-auto px-4'>
						<div className='flex justify-between items-center'>
							<div className='flex items-center space-x-4'>
								<div>
									<h1 className='text-4xl font-bold text-gray-800'>
										{course?.name}
									</h1>
									<Link href={`/universities/${university?._id}`}>
										<p className='text-sm font-medium text-gray-500'>
											{university?.name?.toUpperCase() ?? ''}
										</p>
									</Link>

									<div className='flex items-center '>
										<p className='text-sm font-medium text-teal-500'>
											{course?.code}
										</p>
										<span className='text-sm font-medium text-gray-500'>
											Average rating:
										</span>
										<div className='flex items-center space-x-1'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-4 w-4 text-teal-500'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M17.156,8.988l1.844-.283a1.162,1.162,0,0,1,1.355,1.355l-.283,1.844a1.162,1.162,0,0,1-1.1.941l-1.912.285-.862,1.746a1.162,1.162,0,0,1-2.077,0l-.862-1.746-1.912-.285a1.162,1.162,0,0,1-1.1-.941l-.283-1.844a1.162,1.162,0,0,1,1.355-1.355l1.844.283.862-1.746a1.162,1.162,0,0,1,2.077,0l.862,1.746,1.912.285A1.162,1.162,0,0,1,17.156,8.988ZM10,13.347a3.347,3.347,0,1,0-3.347-3.347A3.347,3.347,0,0,0,10,13.347Z'
												/>
											</svg>
											<span className='text-sm font-medium text-gray-500'>
												{course?.average_rating?.toFixed(1) ?? 0.0}
											</span>
										</div>
									</div>
								</div>
							</div>

							<Link
								href={`
								/universities/${course?.university}/courses/${course?._id}/past-papers
							`}>
								<div className='relative flex items-center space-x-2 py-2 px-3 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition duration-200'>
									<FaFileAlt className='text-lg' />
									<span className='text-sm font-medium'>Past Papers</span>
									<span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full'>
										0
									</span>
								</div>
							</Link>
						</div>
					</div>
				)}
			</motion.div>
			{/* GRID  */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 1 }}
				className='container mx-auto px-4'>
				<div className='grid grid-cols-12 gap-2 mt-4'>
					<div className='col-span-12 lg:col-span-5'>
						<div className='bg-white rounded-lg shadow-lg p-4'>
							<SearchBar
								placeholder='Search lecturers...'
								onChange={handleSearch}
								searchIcon={<FaSearch className='h-6 w-6 m-auto' />}
							/>
							<div className='container mx-auto px-4 mt-3'>
								<h2 className='text-xl font-bold text-gray-800 mb-1'>
									Lecturers Ranking (
									{lecLoading ? <LoadingScreen /> : lecturers?.length ?? 0})
								</h2>
								<Rankings
									sortedLecturers={sortedLecturers}
									searchQuery={searchQuery}
									loading={lecLoading}
									reviews={reviews}
									reviewLoading={reviewLoading}
									lecLoading={lecLoading}
									course={course}
									userData={userData}
									openLecModalFromReview={openLecModalFromReview}
									setOpenLecModalFromReview={setOpenLecModalFromReview}
								/>
							</div>
						</div>
					</div>
					<div className='container mx-auto px-2 col-span-12 lg:col-span-7'>
						{courseLoading ? (
							<LoadingScreen />
						) : (
							<CourseSummary
								course={course}
								sortedLecturers={sortedLecturers}
								courseLoading={courseLoading}
								error={error}
								reviewLoading={reviewLoading}
								reviews={reviews}
								userData={userData}
								setOpenLecModalFromReview={setOpenLecModalFromReview}
							/>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export default CourseDetails
