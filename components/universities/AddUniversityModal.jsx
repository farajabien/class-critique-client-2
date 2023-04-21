import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLecturer } from '../../actions/lecturerActions'
import Select from 'react-select'
import { addUni } from '../../actions/uniActions'
import axios from 'axios'
import PhoneInput from 'react-phone-number-input/input'

export default function AddUniversityModal({
	handleAddUniModal,
	token,
	showAddUniModal,
	loading: unisLoading,
}) {
	const [newUni, setNewUni] = useState({
		name: '',
		abbreviation: '',
		location: '',
		description: '',
		website: '',
	})

	const [contact, setContact] = useState({
		phone: '',
		email: '',
	})

	const [isBannerVisible, setIsBannerVisible] = useState(false)
	const dispatch = useDispatch()
	const [cities, setCities] = useState([])
	const [universities, setUniversities] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'http://universities.hipolabs.com/search?country=kenya'
				)
				const data = response.data
					.filter((university, index, self) => {
						return index === self.findIndex((u) => u.name === university.name)
					})
					.map((university) => ({
						value: university.name,
						label: university.name,
						details: {
							country: university.country,
							website: university.web_pages[0],
						},
					}))
				setUniversities(data)
				setLoading(false)
			} catch (error) {
				setError('An error occurred while fetching universities data.')
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	useEffect(() => {
		const fetchCities = async () => {
			try {
				const response = await axios.get(
					'https://api.teleport.org/api/cities/?search=kenya'
				)
				const data = response.data._embedded['city:search-results'].map(
					(city) => ({
						value: city._links['city:item'].href,
						label: city.matching_full_name,
					})
				)
				setCities(data)
				setLoading(false)
			} catch (error) {
				setError('An error occurred while fetching cities data.')
				setLoading(false)
			}
		}
		fetchCities()
	}, [])

	const handleCityChange = (selectedCity) => {
		if (selectedCity) {
			setNewUni({
				...newUni,
				location: selectedCity.label,
			})
		} else {
			setNewUni({
				...newUni,
				location: '',
			})
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const uni = {
			name: newUni.name,
			abbreviation: newUni.abbreviation,
			location: newUni.location,
			description: newUni.description,
			websiteUrl: newUni.website,
			email: contact.email,
			phone: contact.phone,
		}
		dispatch(addUni(token, uni)).then((res) => {
			setNewUni({
				name: '',
				abbreviation: '',
				location: '',
				description: '',
				website: '',
			})
			setContact({
				phone: '',
				email: '',
			})
			setIsBannerVisible(true)
			setTimeout(() => {
				setIsBannerVisible(false)
			}, 5000)
		})
	}

	return (
		<>
			<div
				className='fixed overflow-y-auto inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50'
				onClick={handleAddUniModal}>
				{isBannerVisible && (
					<div className='fixed top-0 left-0 w-full bg-teal-500 text-white text-center p-2 py-8 z-50'>
						New university added! {newUni.name}
					</div>
				)}
				<div
					className='bg-white rounded-lg p-6 max-w-3xl w-full min-h-96 h-5/6 overflow-hidden overflow-y-scroll '
					onClick={(e) => e.stopPropagation()}>
					<form onSubmit={handleSubmit}>
						<div className='flex justify-between items-center mb-4'>
							<h2 className='text-xl font-bold'>Add New University</h2>
							<button
								type='button'
								className='text-red-500 text-xl font-semibold'
								onClick={handleAddUniModal}>
								X
							</button>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>Name</label>
							<Select
								options={universities}
								value={universities.find((uni) => uni.value === newUni.name)}
								onChange={(selectedUni) => {
									setNewUni({
										...newUni,
										name: selectedUni.value,
										website: selectedUni.details.website,
									})
								}}
								placeholder='Select university'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>
								Abbreviation
							</label>
							<input
								type='text'
								placeholder='Enter abbreviation'
								value={newUni.abbreviation}
								onChange={(e) =>
									setNewUni({ ...newUni, abbreviation: e.target.value })
								}
								className='px-3 py-2 border-2 border-gray-400 rounded-lg w-full'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>
								Location
							</label>
							<Select
								options={cities}
								isLoading={loading}
								isClearable
								placeholder='Select a city'
								onChange={handleCityChange}
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>
								Description
							</label>
							<textarea
								rows='4'
								placeholder='Enter description'
								value={newUni.description}
								onChange={(e) =>
									setNewUni({ ...newUni, description: e.target.value })
								}
								className='px-3 py-2 border-2 border-gray-400 rounded-lg w-full'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>
								Website
							</label>
							<input
								type='text'
								placeholder='Enter website'
								value={newUni.website}
								onChange={(e) =>
									setNewUni({ ...newUni, website: e.target.value })
								}
								className='px-3 py-2 border-2 border-gray-400 rounded-lg w-full'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>
								Phone
							</label>
							<PhoneInput
								placeholder='Enter phone number'
								value={contact.phone}
								required
								onChange={(value) => setContact({ ...contact, phone: value })}
								className='px-3 py-2 border-2 border-gray-400 rounded-lg w-full'
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-gray-700 font-bold mb-2'>
								Email
							</label>
							<input
								type='email'
								placeholder='Enter email'
								value={contact.email}
								required
								onChange={(e) =>
									setContact({ ...contact, email: e.target.value })
								}
								className='px-3 py-2 border-2 border-gray-400 rounded-lg w-full'
							/>
						</div>
						<div className='flex justify-end'>
							<button
								type='submit'
								className={`bg-teal-500 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-teal-600 ${
									unisLoading || newUni.name == ''
										? 'bg-gray-400 cursor-not-allowed'
										: ''
								}`}
								disabled={unisLoading || newUni.name == ''}>
								Add University
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
