import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/authActions'
import { getUniversities, getUniversity } from '../../actions/uniActions'
import Select from 'react-select'
import { FaStar, FaTrash } from 'react-icons/fa'

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
	const [watchListLecs, setWatchListLecs] = useState([])
	const [watchListCourses, setWatchListCourses] = useState([])
	const [watchListUnis, setWatchListUnis] = useState([])
	const [selectedUni, setSelectedUni] = useState(null)
	const [showUniModal, setShowUniModal] = useState(false)

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
		<div className='container mx-auto px-4'>
			<SignedIn>
				<div className='flex justify-between items-center my-4'>
					<h1 className='text-2xl font-bold'>Student Profile</h1>
					<UserButton />
				</div>
				{showUniModal && (
					<div className='fixed z-50 inset-0 overflow-y-auto'>
						<div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
							<div className='fixed inset-0 transition-opacity'>
								<div className='absolute inset-0 bg-gray-500 opacity-75'></div>
							</div>
							<span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
							&#8203;
							<div
								className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
								role='dialog'
								aria-modal='true'
								aria-labelledby='modal-headline'>
								<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
									<div className='sm:flex sm:items-start'>
										<div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10'>
											<svg
												className='h-6 w-6 text-blue-600'
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
												aria-hidden='true'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M16 17l-4 4m0 0l-4-4m4 4V3'
												/>
											</svg>
										</div>
										<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
											<h3
												className='text-lg leading-6 font-medium text-gray-900'
												id='modal-headline'>
												Select Your University
											</h3>
											<div className='mt-2'>
												<Select
													options={universityOptions}
													onChange={handleUniChange}
												/>
											</div>
											{uniError && (
												<div className='text-red-500 mt-2'>{uniError}</div>
											)}
										</div>
									</div>
								</div>
								<div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
									<button
										type='button'
										onClick={handleSelectUni}
										className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'>
										Save
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</SignedIn>
		</div>
	)
}

export default StudentProfile
