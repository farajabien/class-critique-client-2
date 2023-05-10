import React, { useEffect, useState } from 'react'
import { FaStar, FaCommentAlt, FaUser } from 'react-icons/fa'
import LecturerModal from './LecturerModal'
import LoadingScreen from '../molecules/LoadingScreen'

const LecturerRankingCard = ({
	lecturer,
	rank,
	reviews,
	reviewLoading,
	course,
	userData,
}) => {
	const [showModal, setShowModal] = useState(false)

	const handleModal = () => {
		setShowModal(!showModal)
	}

	useEffect(() => {
		if (!lecturer) {
			setShowModal(false)
		}
	}, [lecturer])

	return (
		<div
			className={`shadow-lg rounded-lg p-4 mb-2 ${
				rank === 1
					? 'bg-teal-500 hover:bg-teal-600 transition duration-300 ease-in-out'
					: 'bg-white hover:bg-gray-100 transition duration-300 ease-in-out'
			} cursor-pointer`}
			onClick={handleModal}>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex items-center'>
					<div className='flex-shrink-0 font-bold mr-4 text-sm bg-gray-200 rounded-full py-1 px-2'>
						{rank}
					</div>
					<div className='flex flex-col'>
						<h2 className={`font-bold ${rank === 1 ? 'text-lg' : 'text-base'}`}>
							{lecturer?.name}
						</h2>
						<div
							className={`flex items-center text-gray-500 text-xs ml-1 ${
								rank === 1 ? 'text-white' : ''
							}`}>
							<FaUser className='inline mr-1' />
							{reviews.length ?? 0} ratings
						</div>
					</div>
				</div>
				<div className='flex items-center'>
					<span className='text-yellow-400 text-xs mr-1'>
						<FaStar />
					</span>
					<p className={`font-bold ${rank === 1 ? 'text-lg' : 'text-base'}`}>
						{typeof lecturer?.avgRating === 'number'
							? lecturer?.avgRating?.toFixed(1) ?? 0
							: 'N/A'}
					</p>
				</div>
			</div>
			{showModal && (
				<LecturerModal
					className='fixed top-0 left-0 w-full h-full'
					lecturer={lecturer}
					rank={rank}
					handleCloseModal={() => setShowModal(false)}
					handleCloseReviewModal={() => setShowModal(false)}
					reviews={reviews}
					course={course}
					reviewLoading={reviewLoading}
					userData={userData}
				/>
			)}
		</div>
	)
}

export default LecturerRankingCard
