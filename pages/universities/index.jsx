import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UniversityCard from '../../components/universities/UniversityCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUniversities } from '../../actions/uniActions'
import LoadingScreen from '../../components/molecules/LoadingScreen'
import SearchBar from '../../components/molecules/SearchBar'
import { FaSearch, FaStar } from 'react-icons/fa'
import { MdRateReview } from 'react-icons/md'
import AddUniversityModal from '../../components/universities/AddUniversityModal'
import Avatar from 'react-avatar'
import { motion } from 'framer-motion'
import { shuffle } from 'lodash'
//import Link
import Link from 'next/link'

const Universities = () => {
	const dispatch = useDispatch()
	const universities = useSelector((state) => state.uniReducer.unis)
	const loading = useSelector((state) => state.uniReducer.loading)
	const error = useSelector((state) => state.uniReducer.error)
	const { user, token } = useSelector((state) => state.authReducer)
	const [searchQuery, setSearchQuery] = useState('')
	const isAdmin = user && user.role === 'admin'
	const [showAddUniModal, setShowAddUniModal] = useState(false)
	const canAdd = isAdmin

	useEffect(() => {
		dispatch(getUniversities())
	}, [dispatch])

	const handleSearch = (query) => {
		setSearchQuery(query)
	}

	const handleAddUniModal = () => {
		setShowAddUniModal(!showAddUniModal)
	}

	// Shuffle the universities to create a gamified experience
	const shuffledUniversities = shuffle(universities)

	// Filter universities by search query
	const filteredUniversities = shuffledUniversities.filter((uni) =>
		uni.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	// Define animations
	const cardVariants = {
		hidden: { opacity: 0, scale: 0 },
		visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
	}
	const avatarVariants = {
		hidden: { scale: 0 },
		visible: { scale: 1, transition: { duration: 0.5 } },
	}

	return (
		<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
			{canAdd && (
				<div className='my-4'>
					<motion.button
						className='bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1, duration: 1 }}
						onClick={handleAddUniModal}>
						Add University
					</motion.button>
					{showAddUniModal && (
						<AddUniversityModal
							showAddUniModal={showAddUniModal}
							handleAddUniModal={handleAddUniModal}
							token={token}
							loading={loading}
						/>
					)}
				</div>
			)}
			<div className='my-8 flex justify-center'>
				<div className='w-full sm:w-1/2'>
					<SearchBar
						placeholder={`Search for universities`}
						onChange={handleSearch}
						searchIcon={<FaSearch className='h-6 w-6 m-auto' />}
					/>
				</div>
			</div>
			{loading && <LoadingScreen />}

			{error && <p className='text-red-600 my-4 text-center'>{error}</p>}
			{filteredUniversities.length === 0 && !loading && (
				<p className='text-gray-600 my-4 text-center'>
					{searchQuery.length === 0
						? 'No universities found'
						: `No universities found with the search query ${searchQuery}`}
				</p>
			)}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{filteredUniversities.map((uni, index) => (
					<Link
						key={uni._id}
						href={`/universities/${uni._id}`}
						className='bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out'>
						<UniversityCard uni={uni} index={index} />
					</Link>
				))}
			</div>
		</div>
	)
}
export default Universities
