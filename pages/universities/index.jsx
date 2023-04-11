import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UniversityCard from '../../components/universities/UniversityCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUniversities } from '../../actions/uniActions'
import LoadingScreen from '../../components/molecules/LoadingScreen'
import SearchBar from '../../components/molecules/SearchBar'
import { FaSearch } from 'react-icons/fa'

const Universities = () => {
	const dispatch = useDispatch()
	const universities = useSelector((state) => state.uniReducer.unis)
	const loading = useSelector((state) => state.uniReducer.loading)
	const error = useSelector((state) => state.uniReducer.error)
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		dispatch(getUniversities())
	}, [dispatch])

	const handleSearch = (query) => {
		setSearchQuery(query)
	}

	// Filter universities by search query
	const filteredUniversities = universities.filter((uni) =>
		uni.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
			<div className='my-8 flex justify-center'>
				<div className='w-full sm:w-1/2 md:w-1/3'>
					<SearchBar
						placeholder={`Search for universities`}
						onChange={handleSearch}
						searchIcon={<FaSearch className='h-6 w-6 m-auto' />}
					/>
				</div>
			</div>

			{loading ? (
				<div className='flex justify-center items-center mt-8'>
					<LoadingScreen />
				</div>
			) : error ? (
				<div>
					<h1 className='text-2xl font-bold text-center'>Error</h1>
					<p className='text-center'>{error}</p>
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{filteredUniversities.map((uni) => (
						<UniversityCard key={uni.id} uni={uni} />
					))}
				</div>
			)}
		</div>
	)
}

export default Universities
