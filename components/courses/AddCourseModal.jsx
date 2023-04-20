import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLecturer } from '../../actions/lecturerActions'
import Select from 'react-select'
import { addCourse } from '../../actions/courseActions'

export default function AddCourseModal({
	showAddCourseModal,
	handleAddCourseModal,
	uniId,
	token,
}) {
	const lecturers = useSelector((state) => state.lecturerReducer.uniLecturers)
	const [newCourse, setNewCourse] = useState({
		name: '',
		code: '',
		description: '',
		level: '',
		university: uniId,
		lecturers: [],
	})

	const [isBannerVisible, setIsBannerVisible] = useState(false)

	const banner = (
		<div className='fixed top-0 left-0 w-full bg-teal-500 text-white text-center p-2 py-8 z-50'>
			New course added! {newCourse.name}
		</div>
	)

	const [searchTerm, setSearchTerm] = useState('')
	const [filteredLecturers, setFilteredLecturers] = useState(lecturers)
	const [selectedLecturers, setSelectedLecturers] = useState([])
	const dispatch = useDispatch()

	const handleSearchCourses = (event) => {
		setSearchTerm(event.target.value)
		const filtered = lecturers.filter((lec) =>
			lec.name.toLowerCase().includes(event.target.value.toLowerCase())
		)
		setFilteredLecturers(filtered)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const course = {
			name: newCourse.name,
			code: newCourse.code,
			description: newCourse.description,
			level: newCourse.level,
			university: uniId,
			lecturers: selectedLecturers,
		}
		dispatch(addCourse(token, uniId, course)).then(() => {
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
		setSelectedLecturers(values)
	}

	const options = filteredLecturers.map((lec) => ({
		value: lec._id,
		label: `${lec.name}`,
	}))

	return (
		<>
			<div
				className='fixed overflow-y-auto inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50'
				onClick={handleAddCourseModal}>
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
							onClick={handleAddCourseModal}>
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
						<h1 className='text-3xl font-bold mb-4'>Add a new course</h1>
						<div className='mb-4'>
							<button
								type='submit'
								className='bg-teal-800 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
								Add Lecturer
							</button>
						</div>
						<div className='mb-4'>
							<label
								htmlFor='name'
								className='block text-gray-800 font-bold mb-2'>
								Course Name
							</label>
							<input
								type='text'
								id='firstName'
								name='firstName'
								value={newCourse.name}
								onChange={(event) => {
									setNewCourse({
										...newCourse,
										name: event.target.value,
									})
								}}
								placeholder='Enter first name'
								required
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline'
							/>

							<label
								htmlFor='code'
								className='block text-gray-800 font-bold mb-2'>
								Course code
							</label>
							<input
								type='text'
								id='code'
								name='code'
								value={newCourse.code}
								onChange={(event) => {
									setNewCourse({
										...newCourse,
										code: event.target.value,
									})
								}}
								placeholder='Enter last name'
								required
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline'
							/>

							<label
								htmlFor='description'
								className='block text-gray-800 font-bold mb-2'>
								Course description
							</label>
							{/* text area  */}
							<textarea
								id='description'
								name='description'
								value={newCourse.description}
								onChange={(event) => {
									setNewCourse({
										...newCourse,
										description: event.target.value,
									})
								}}
								placeholder='Enter description'
								required
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline'
							/>
						</div>

						<div className='mb-4'>
							<label
								htmlFor='lecturers'
								className='block text-gray-700 font-bold mb-2'>
								Lecturers
							</label>
							<Select
								isMulti
								options={options}
								value={selectedLecturers.map((value) =>
									options.find((option) => option.value === value)
								)}
								onChange={handleSelectChange}
								placeholder='Select lecturers'
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
