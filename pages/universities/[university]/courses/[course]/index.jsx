import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseByUniCourse } from '../../../../../actions/courseActions'
import LecturerCard from '../../../../../components/lecturers/LecturerCard'
import LecturerRatings from '../../../../../components/lecturers/LecturerRatings'
// import LecturerRatings from './LecturerRatings'
// import LecturerDetails from './LecturerDetails'
// import Rankings from './Rankings'

export default function CourseDetails() {
	const router = useRouter()
	const { university: uniId, course: courseId } = router.query
	const [searchQuery, setSearchQuery] = useState('')
	const [viewMode, setViewMode] = useState('ratings')
	const dispatch = useDispatch()
	const course = useSelector((state) => state.courseReducer.selectedUniCourse)
	const lecturers = useSelector((state) => state.lecturerReducer.uniLecturers)
	const loading = useSelector((state) => state.courseReducer.loading)
	const error = useSelector((state) => state.courseReducer.error)

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

	if (loading) {
		return <div className='m-5'>Loading...</div>
	}

	if (error) {
		return <div className='m-5'>{error}</div>
	}

	return (
		<main className='max-w-7xl mx-auto py-12 sm:px-6 lg:px-8'>
			{/* Course header */}
			<div className='bg-white rounded-lg shadow-md p-6 mb-6'>
				<h1 className='text-3xl font-bold'>{course?.name}</h1>
				<p className='text-lg text-gray-500 mb-4'>{course?.code}</p>
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<p className='font-semibold'>Number of Lectures:</p>
						<p>{course?.numLectures}</p>
					</div>
					<div>
						<p className='font-semibold'>Credits:</p>
						<p>{course?.credits}</p>
					</div>
				</div>
			</div>

			{/* Lecturer search */}
			<div className='mb-6'>
				<input
					type='text'
					className='w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
					placeholder='Search lecturers'
					value={searchQuery}
					onChange={(e) => handleSearch(e.target.value)}
				/>
			</div>

			{/* View mode buttons */}
			<div className='flex mb-6'>
				<button
					className={`mr-2 ${
						viewMode === 'ratings'
							? 'bg-indigo-500 text-white'
							: 'bg-gray-300 text-gray-700'
					} px-4 py-2 rounded-md`}
					onClick={() => handleViewMode('ratings')}>
					Ratings
				</button>
				<button
					className={`mr-2 ${
						viewMode === 'rankings'
							? 'bg-indigo-500 text-white'
							: 'bg-gray-300 text-gray-700'
					} px-4 py-2 rounded-md`}
					onClick={() => handleViewMode('rankings')}>
					Rankings
				</button>
				<button
					className={`mr-2 ${
						viewMode === 'details'
							? 'bg-indigo-500 text-white'
							: 'bg-gray-300 text-gray-700'
					} px-4 py-2 rounded-md`}
					onClick={() => handleViewMode('details')}>
					Details
				</button>
			</div>
			{/* Main content */}
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p>Error: {error}</p>
			) : (
				<>
					{viewMode === 'ratings' && (
						<LecturerRatings lecturers={lecturers} searchQuery={searchQuery} />
					)}
					{viewMode === 'rankings' && (
						// <Rankings />
						<p>Rankings</p>
					)}
					{viewMode === 'details' && (
						// <LecturerDetails />
						<p>Lecturer details</p>
					)}
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{lecturers
							.filter((lecturer) =>
								`${lecturer.firstName} ${lecturer.lastName}`
									.toLowerCase()
									.includes(searchQuery.toLowerCase())
							)
							.map((lecturer) => (
								<>
									<LecturerCard key={lecturer._id} lecturer={lecturer} />
									<LecturerCard key={lecturer._id} lecturer={lecturer} />
									<LecturerCard key={lecturer._id} lecturer={lecturer} />
									<LecturerCard key={lecturer._id} lecturer={lecturer} />
								</>
							))}
					</div>
				</>
			)}
		</main>
	)
}
