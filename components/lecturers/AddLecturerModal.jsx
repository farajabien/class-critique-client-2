import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLecturer } from '../../actions/lecturerActions'
import Select from 'react-select'

export default function AddLecModal({
	showAddLecModal,
	handleAddLecModal,
	uniId,
	token,
}) {
	const courses = useSelector((state) => state.courseReducer.uniCourses)
	const [newLec, setNewLec] = useState({
		fName: '',
		lName: '',
		email: '',
		phone: '',
		university: uniId,
		courses: [],
	})

	const [isBannerVisible, setIsBannerVisible] = useState(false)

	const banner = (
		<div className='fixed top-0 left-0 w-full bg-teal-500 text-white text-center p-2 py-8 z-50'>
			New LEC added! {newLec.fName}
		</div>
	)

	const [searchTerm, setSearchTerm] = useState('')
	const [filteredCourses, setFilteredCourses] = useState(courses)
	const [selectedCourses, setSelectedCourses] = useState([])
	const dispatch = useDispatch()

	const handleSearchCourses = (event) => {
		setSearchTerm(event.target.value)
		const filtered = courses.filter(
			(course) =>
				course.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
				course.code.toLowerCase().includes(event.target.value.toLowerCase())
		)
		setFilteredCourses(filtered)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const lecturer = {
			name:
				newLec.fName.charAt(0).toUpperCase() +
				newLec.fName.slice(1) +
				' ' +
				newLec.lName.charAt(0).toUpperCase() +
				newLec.lName.slice(1),
			email: newLec.email,
			phone: newLec.phone,
			university: uniId,

			courses: selectedCourses,
		}
		console.log('new lec', lecturer)
		dispatch(addLecturer(token, uniId, lecturer)).then(() => {
			setIsBannerVisible(true)
			setTimeout(() => {
				setIsBannerVisible(false)
			}, 5000)
		})
	}

	const handleSelectChange = (selectedOptions) => {
		const values = selectedOptions
			? selectedOptions.map((option) => option.value)
			: []
		setSelectedCourses(values)
	}

	const options = filteredCourses.map((course) => ({
		value: course._id,
		label: `${course.name} (${course.code})`,
	}))

	return (
		<>
			<div
				className='fixed overflow-y-auto inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50'
				onClick={handleAddLecModal}>
				{isBannerVisible && banner}
				{/* close icon  */}

				<div
					className='bg-white rounded-lg p-6 max-w-3xl w-full min-h-96 h-5/6 overflow-hidden overflow-y-scroll '
					onClick={(e) => e.stopPropagation()}>
					<div
						className='absolute
          top-8 right-0
          m-4
          '>
						<button
							className='text-gray-500 hover:text-gray-700'
							onClick={handleAddLecModal}>
							<svg
								className='h-6 w-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>

					<form onSubmit={handleSubmit} className='w-full max-w-md mt-2'>
						<h1 className='text-3xl font-bold mb-4'>Add a new lecturer</h1>
						<div className='mb-4'>
							<button
								type='submit'
								className='bg-teal-800 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
								Add Lecturer
							</button>
						</div>
						<div className='mb-4'>
							<label
								htmlFor='fName'
								className='block text-gray-800 font-bold mb-2'>
								First Name
							</label>
							<input
								type='text'
								id='firstName'
								name='firstName'
								value={newLec.fName}
								onChange={(event) => {
									setNewLec({
										...newLec,
										fName: event.target.value,
									})
								}}
								placeholder='Enter first name'
								required
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline'
							/>

							<label
								htmlFor='lName'
								className='block text-gray-800 font-bold mb-2'>
								Last Name
							</label>
							<input
								type='text'
								id='lastName'
								name='lastName'
								value={newLec.lName}
								onChange={(event) => {
									setNewLec({
										...newLec,
										lName: event.target.value,
									})
								}}
								placeholder='Enter last name'
								required
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline'
							/>

							<label
								htmlFor='email'
								className='block text-gray-800 font-bold mb-2'>
								Email
							</label>
							<input
								type='email'
								id='email'
								name='email'
								value={newLec.email}
								onChange={(event) => {
									setNewLec({
										...newLec,
										email: event.target.value,
									})
								}}
								placeholder='Enter email'
								required
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline'
							/>

							<label
								htmlFor='phone'
								className='block text-gray-800 font-bold mb-2'>
								Phone
							</label>
							<input
								type='text'
								id='phone'
								name='phone'
								value={newLec.phone}
								onChange={(event) => {
									setNewLec({
										...newLec,
										phone: event.target.value,
									})
								}}
								placeholder='Enter phone'
								required
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline'
							/>
						</div>

						<div className='mb-4'>
							<label
								htmlFor='lecturers'
								className='block text-gray-700 font-bold mb-2'>
								Courses
							</label>
							<Select
								isMulti
								options={options}
								value={selectedCourses.map((value) =>
									options.find((option) => option.value === value)
								)}
								onChange={handleSelectChange}
								placeholder='Select courses'
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
