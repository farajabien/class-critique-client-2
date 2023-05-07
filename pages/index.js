import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUniversities } from '../actions/uniActions'
import UniversityCard from '../components/universities/UniversityCard'
import SearchBar from '../components/molecules/SearchBar'
import { FaSearch, FaStar, FaUniversity, FaUserGraduate } from 'react-icons/fa'
import StatsCard from '../components/molecules/StatsCard'
import { getReviews } from '../actions/reviewActions'

export default function Home() {
	const dispatch = useDispatch()
	const universities = useSelector((state) => state.uniReducer.unis)
	const reviews = useSelector((state) => state.reviewReducer.reviews)
	const loading = useSelector((state) => state.uniReducer.loading)
	const error = useSelector((state) => state.uniReducer.error)
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		dispatch(getUniversities())
		dispatch(getReviews())
	}, [dispatch])

	const handleSearch = (query) => {
		setSearchQuery(query)
	}

	// Filter universities by search query
	const filteredUniversities = universities.filter((uni) =>
		uni.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const totalUniversities = universities.length
	const totalReviews = reviews.length ?? 0
	const totalStudents = 0

	//if loading

	return (
		<div className='min-h-screen bg-gray-100'>
			<main className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='py-12 text-center'>
					<h1 className='text-5xl font-bold mb-4 text-teal-500'>
						Find Your Perfect Lecturer
					</h1>
					<p className='text-xl text-center mb-8'>
						Rate your lecturer and find the best ones for your courses
					</p>
					<div className='my-8 flex justify-center'>
						<div className='w-full sm:w-1/2 md:w-1/3'>
							<SearchBar
								placeholder='Search for universities'
								searchIcon={<FaSearch className='h-6 w-6 m-auto' />}
								className='w-full'
								onChange={handleSearch}
							/>
							{searchQuery.length > 0 && (
								<p className='my-2 text-normal text-center'>
									{filteredUniversities.length} universities found.
								</p>
							)}
						</div>
					</div>
				</div>

				{loading && <div className='text-center'>Loading...</div>}
				{error && <div className='text-center'>{error}</div>}

				{searchQuery !== '' ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
						{filteredUniversities.map((uni) => (
							<UniversityCard key={uni._id} uni={uni} loading={loading} />
						))}
					</div>
				) : (
					<div className='flex justify-evenly items-center flex-wrap'>
						<StatsCard
							icon={<FaUniversity />}
							label='Universities'
							value={totalUniversities + ' +'}
							className='p-8'
						/>
						<StatsCard
							icon={<FaStar />}
							label='Total reviews'
							value={totalReviews + ' +'}
						/>
						<StatsCard
							icon={<FaUserGraduate />}
							label='Total students'
							value={totalStudents + ' +'}
						/>
					</div>
				)}
			</main>
		</div>
	)
}
