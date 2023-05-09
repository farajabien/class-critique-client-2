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
import Link from 'next/link'
import LoadingScreen from '../../components/molecules/LoadingScreen'

const StudentProfile = () => {
	const { user, isLoading } = useUser()
	const {
		unis: universities,
		loading: uniLoading,
		error: uniError,
		selectedUni: uni,
	} = useSelector((state) => state.uniReducer)
	const { userData, error: userDataError } = useSelector(
		(state) => state.authReducer
	)
	const [watchListLecs, setWatchListLecs] = useState([])
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
	}, [dispatch, user, isLoading, userData])

	const handleSelectUni = () => {
		if (user && !isLoading) {
			const university = selectedUni.value
			const newUserData = {
				...user,
				university,
			}
			dispatch(register(newUserData))

			setShowUniModal(false)
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
		<>
			<SignedIn>
				<div className='bg-gray-100 min-h-screen p-6'>
					{isLoading && <p>Loading...</p>}
					{userData && (
						<>
							<div className='flex flex-col md:flex-row md:justify-between'>
								<div className='md:w-1/2 md:pr-6 mb-6 md:mb-0'>
									<div className='bg-white rounded-md shadow-md p-6'>
										<div className='flex items-center mb-6'>
											<div className='flex-shrink-0'>
												<UserButton afterSignOutUrl='/auth/login' />
											</div>
											<div className='ml-4'>
												<h2 className='text-lg font-semibold'>
													{userData.firstName} {userData.lastName}
												</h2>
												<p className='text-gray-700 text-sm'>
													{userData.email}
												</p>
												{userData.university ? (
													<p className='text-gray-700 text-sm'>
														{uni?.name} ({uni?.abbreviation})
													</p>
												) : (
													<p className='text-gray-700 text-sm'>
														No university selected
													</p>
												)}
											</div>
										</div>
										<div className='flex items-center justify-between'>
											<div>
												<h3 className='text-md font-semibold mb-2'>
													Watched Lectures ({watchListLecs.length})
												</h3>
												{watchListLecs.length > 0 ? (
													watchListLecs.map((lec) => (
														<p
															key={lec.id}
															className='text-gray-700 text-sm mb-2'>
															{lec.course} - {lec.title}
														</p>
													))
												) : (
													<p className='text-gray-700 text-sm'>
														No watched lectures
													</p>
												)}
											</div>
											<div>
												<h3 className='text-md font-semibold mb-2'>
													Watched Courses ({watchListCourses.length})
												</h3>
												{watchListCourses.length > 0 ? (
													watchListCourses.map((course) => (
														<p
															key={course.id}
															className='text-gray-700 text-sm mb-2'>
															{course.name}
														</p>
													))
												) : (
													<p className='text-gray-700 text-sm'>
														No watched courses
													</p>
												)}
											</div>
										</div>
									</div>
								</div>
								<div className='md:w-1/2 md:pl-6'>
									<div className='bg-white rounded-md shadow-md p-6'>
										<div className='flex items-center justify-between mb-6'>
											<h2 className='text-lg font-semibold'>
												Profile Settings
											</h2>
											<div className='relative'>
												<UserButton
													afterSignOutUrl='/auth/login'
													onClick={() => setProfileMenuOpen(!profileMenuOpen)}
												/>
												<div
													className={`${
														profileMenuOpen ? 'block' : 'hidden'
													} absolute right-0 mt-2 py-2 w-32 bg-white rounded-md shadow-lg z-10`}>
													<SignedIn />
												</div>
											</div>
										</div>
										<div>
											<h3 className='text-md font-semibold mb-2'>
												Watched Universities ({watchListUnis.length})
											</h3>
											{watchListUnis.length > 0 ? (
												watchListUnis.map((uni) => (
													<p
														key={uni.id}
														className='text-gray-700 text-sm mb-2'>
														{uni.name} ({uni.abbreviation})
													</p>
												))
											) : (
												<p className='text-gray-700 text-sm'>
													No watched universities
												</p>
											)}
										</div>
										{/* display uni info  */}
										{userData && !uniLoading && !uni ? (
											<>
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
														className='bg-teal-500 text-white px-4 py-2 rounded-md mt-4'
														onClick={handleSelectUni}>
														Save
													</button>
												</div>
											</>
										) : (
											<>
												{uniLoading ? (
													<LoadingScreen />
												) : (
													<Link
														href={{
															pathname: '/universities/[university]',
															query: { university: uni._id },
														}}
														className='bg-white rounded-md py-4  mb-4'>
														<h2 className='text-lg font-semibold mb-2'>
															Your University
														</h2>
														<p className='text-gray-700 text-sm'>
															{uni.name} ({uni.abbreviation})
														</p>
													</Link>
												)}
											</>
										)}
									</div>
								</div>
							</div>
						</>
					)}
					{showUniModal && (
						<div className='fixed overflow-y-auto inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50'>
							<div
								className='bg-white rounded-lg p-6 max-w-3xl w-full min-h-96 h-5/6 overflow-hidden overflow-y-scroll '
								onClick={(e) => e.stopPropagation()}>
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
										className='bg-teal-500 text-white px-4 py-2 rounded-md mt-4'
										onClick={handleSelectUni}>
										Save
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</SignedIn>
		</>
	)
}

export default StudentProfile
