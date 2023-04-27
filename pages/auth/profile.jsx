import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/authActions'
import { getUniversities, getUniversity } from '../../actions/uniActions'
import Select from 'react-select'
import {
	FaBook,
	FaPlusSquare,
	FaStar,
	FaTrash,
	FaUserTie,
} from 'react-icons/fa'

const watchListLecsSample = [
	{
		_id: '1',
		name: 'John Doe',
		email: 'johndoe@example.com',
		university: {
			code: 'UCLA',
		},
		avgRating: 4.8,
	},
	{
		_id: '2',
		name: 'Jane Smith',
		email: 'janesmith@example.com',
		university: {
			code: 'MIT',
		},
		avgRating: 4.3,
	},
	{
		_id: '3',
		name: 'Bob Johnson',
		email: 'bobjohnson@example.com',
		university: {
			code: 'Stanford',
		},
		avgRating: 4.6,
	},
]

const StudentProfile = () => {
	const { user, isLoading } = useUser()
	const {
		unis: universities,
		error: uniError,
		selectedUni: uni,
	} = useSelector((state) => state.uniReducer)
	const { user: userData, error: userDataError } = useSelector(
		(state) => state.authReducer
	)
	const [watchListLecs, setWatchListLecs] = useState(watchListLecsSample)
	const [watchListCourses, setWatchListCourses] = useState([])
	const [watchListUnis, setWatchListUnis] = useState([])
	const [selectedUni, setSelectedUni] = useState(null)
	const [showUniModal, setShowUniModal] = useState(false)
	const [profileMenuOpen, setProfileMenuOpen] = useState(false)

	const dispatch = useDispatch()

	useEffect(() => {
		if (userData) {
			if (userData.university) {
				dispatch(getUniversity(userData.university))
				setShowUniModal(false)
			} else {
				dispatch(getUniversities())
				setShowUniModal(true)
			}
		}
	}, [userData, dispatch])

	useEffect(() => {
		if (user && !isLoading && !userData) {
			dispatch(register(user))
		}
	}, [user, isLoading, userData])

	const handleSelectUni = () => {
		if (user && !isLoading) {
			const university = selectedUni.value
			const newUserData = {
				...user,
				university,
			}
			dispatch(register(newUserData))
		}
	}

	useEffect(() => {
		if (userData && userData.university) {
			setShowUniModal(false)
		}
	}, [userData])

	const handleUniChange = (selectedOption) => {
		setSelectedUni(selectedOption)
	}

	const universityOptions = universities.map((uni) => ({
		value: uni._id,
		label: `${uni.abbreviation} - ${uni.name}`,
	}))

	return (
		<div className='bg-gray-100 min-h-screen'>
			{/* Main content section */}
			<div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-3xl mx-auto'>
					<h1 className='text-2xl font-semibold text-gray-800 mb-4'>
						My Profile
					</h1>
					{uniError && (
						<div className='bg-red-500 text-white py-2 px-4 rounded-md mb-4'>
							{uniError}
						</div>
					)}
					{userDataError && (
						<div className='bg-red-500 text-white py-2 px-4 rounded-md mb-4'>
							{userDataError}
						</div>
					)}

					{/* University selection modal */}
					{showUniModal && (
						<div className='bg-white rounded-md border-2 border-gray-200 py-4 px-4 mb-4'>
							<h2 className='text-lg font-semibold mb-2'>
								Select Your University
							</h2>
							<Select
								options={universityOptions}
								onChange={handleUniChange}
								placeholder='Select university'
							/>
							<button
								className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4'
								onClick={handleSelectUni}>
								Save
							</button>
						</div>
					)}

					{/* University info */}
					{uni && (
						<div className='bg-white rounded-md border-2 border-gray-200 py-4 px-4 mb-4'>
							<h2 className='text-lg font-semibold mb-2'>{uni.name}</h2>

							<div className='text-gray-800 mb-2'>Location: {uni.location}</div>
						</div>
					)}

					<div className='bg-white rounded-md border-2 border-gray-200 py-4 px-4 mb-4'>
						<h2 className='text-lg font-semibold mb-2'>My Watchlist</h2>

						{/* Watchlist - Lecturers */}
						<div className='mb-4'>
							<div className='flex items-center justify-between mb-2'>
								<h3 className='text-md font-semibold text-teal-500'>
									Lecturers
								</h3>
								<div className='text-teal-500 cursor-pointer'>
									<FaPlusSquare />
								</div>
							</div>

							{watchListLecs.length > 0 ? (
								<div className='grid gap-4'>
									{watchListLecs.map((lecturer) => (
										<div
											key={lecturer._id}
											className='bg-teal-50 rounded-md p-4 flex items-center justify-between'>
											<div className='flex items-center'>
												<div className='text-teal-500 mr-2'>
													<FaUserTie />
												</div>
												<div>
													<div className='font-medium'>{lecturer.name}</div>
													<div className='text-gray-600'>{lecturer.email}</div>
													<div className='text-gray-600'>
														{lecturer.university.code}
													</div>
												</div>
											</div>
											<div className='flex items-center'>
												<div className='text-teal-500 mr-2'>
													<FaStar />
												</div>
												<div className='text-gray-600'>
													{lecturer?.avgRating ?? 4.5}
												</div>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className='text-gray-600'>No lecturers found.</div>
							)}
						</div>

						{/* Watchlist - Courses */}
						<div>
							<div className='flex items-center justify-between mb-2'>
								<h3 className='text-md font-semibold text-teal-500'>Courses</h3>
								<div className='text-teal-500 cursor-pointer'>
									<FaPlusSquare />
								</div>
							</div>

							{watchListCourses.length > 0 ? (
								<div className='grid gap-4'>
									{watchListCourses.map((course) => (
										<div
											key={course._id}
											className='bg-teal-50 rounded-md p-4 flex items-center justify-between'>
											<div className='flex items-center'>
												<div className='text-teal-500 mr-2'>
													<FaBook />
												</div>
												<div>
													<div className='font-medium'>{course.name}</div>
													<div className='text-gray-600'>{course.code}</div>
													<div className='text-gray-600'>
														{course.department}
													</div>
												</div>
											</div>
											<div className='flex items-center'>
												<div className='text-teal-500 mr-2'>
													<FaStar />
												</div>
												<div className='text-gray-600'>
													{course?.avgRating ?? 4.5}
												</div>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className='text-gray-600'>No courses found.</div>
							)}
						</div>
					</div>

					{/* Recommended section */}
				</div>
			</div>
		</div>
	)
}

export default StudentProfile
