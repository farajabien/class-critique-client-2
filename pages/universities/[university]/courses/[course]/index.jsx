import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseByUniCourse } from '../../../../../actions/courseActions'

import SearchBar from '../../../../../components/molecules/SearchBar'
import { FaSearch } from 'react-icons/fa'
import { getUniversity } from '../../../../../actions/uniActions'
import Rankings from '../../../../../components/lecturers/Rankings'
import CourseSummary from '../../../../../components/courses/CourseSummary'
import LoadingScreen from '../../../../../components/molecules/LoadingScreen'

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

	useEffect(() => {
		if (uniId && courseId) {
			dispatch(getCourseByUniCourse(uniId, courseId))
			//lecs
			dispatch(getUniversity(uniId))
		}
	}, [courseId, dispatch, uniId])

	const handleSearch = (query) => {
		setSearchQuery(query)
	}

	if (error) {
		return <div className='m-5'>{error}</div>
	}

	return (
		<div className='bg-gray-100 min-h-screen'>
			<div className='bg-white py-6'>
				{courseLoading ? (
					<LoadingScreen />
				) : (
					<div className='container mx-auto px-4'>
						<h1 className='text-3xl font-bold text-gray-800'>{course?.name}</h1>
						<p className='text-sm font-medium text-gray-500'>
							{university?.name?.toUpperCase()}
						</p>
						<div className='flex justify-between items-center mt-4'>
							<div className='flex items-center space-x-4'>
								<p className='text-sm font-medium text-teal-500'>
									{course?.code}
								</p>
								<div className='flex items-center space-x-2'>
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
											{course?.average_rating?.toFixed(1)}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			{/* GRID  */}

			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-12 gap-4 mt-8'>
					<div className='col-span-12 lg:col-span-5'>
						<div className='bg-white rounded-lg shadow-lg p-4'>
							<SearchBar
								placeholder='Search lecturers...'
								onChange={handleSearch}
								searchIcon={<FaSearch className='h-6 w-6 m-auto' />}
							/>
							<div className='container mx-auto px-4 mt-3'>
								<h2 className='text-xl font-bold text-gray-800 mb-1'>
									Lecturers Ranking
								</h2>
								{lecLoading ? (
									<LoadingScreen />
								) : (
									<Rankings
										lecturers={[
											{
												id: 1,
												name: 'John Smith',
												university: 'University of California, Los Angeles',
												course: 'Introduction to Computer Science',
												ratings: [
													{
														_id: '642df5cda90dcd394cd8b87e',
														user: '642da71d294890cef1f19300',
														course: '642da9a66ebd1ed02c74e79e',
														lecturer: '642dbab7889102a224dfbf1f',
														knowledge: 80,
														communication: 76,
														organization: 70,
														feedback: 90,
														engagement: 40,
														professionalism: 60,
														technology: 80,
														grading: 60,
														inclusivity: 100,
														classroom: 80,
														comment: 'Great course, would take again!',
													},
												],
											},
											{
												id: 1,
												name: 'Diego Smith',
												university: 'University of California, Los Angeles',
												course: 'DST3021',
												ratings: [
													{
														_id: '642df5cda90dcd394cd8b87e',
														user: '642da71d294890cef1f19300',
														course: '642da9a66ebd1ed02c74e79e',
														lecturer: '642dbab7889102a224dfbf1f',
														knowledge: 80,
														communication: 76,
														organization: 70,
														feedback: 90,
														engagement: 40,
														professionalism: 60,
														technology: 80,
														grading: 60,
														inclusivity: 100,
														classroom: 80,
														comment: 'Too shaby!',
													},
												],
											},
										]}
										searchQuery={searchQuery}
										loading={lecLoading}
									/>
								)}
							</div>
						</div>
					</div>
					<div className='container mx-auto px-4 mt-3 col-span-12 lg:col-span-7'>
						{courseLoading ? (
							<LoadingScreen />
						) : (
							<CourseSummary
								course={course}
								lecturers={lecturers}
								loading={courseLoading}
								error={error}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CourseDetails
