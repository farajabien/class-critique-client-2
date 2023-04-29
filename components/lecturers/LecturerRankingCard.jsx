import React, { useState } from 'react'
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
	// lecturer.averageRating = 4.5

	const handleModal = () => {
		setShowModal(!showModal)
	}

	return (
		<div
			className={`shadow-lg rounded-lg p-4 mb-2 ${
				rank === 1 ? 'bg-teal-500' : 'bg-white'
			}`}>
			<div className='flex flex-col lg:flex-row justify-between items-center'>
				<div className='flex items-center mb-2 lg:mb-0'>
					<div className='flex-shrink-0 font-bold mr-4 text-lg bg-gray-200 rounded-full py-2 px-4'>
						{rank}
					</div>
					<div className='flex flex-col justify-center'>
						<h2 className={`font-bold ${rank === 1 ? 'text-lg' : 'text-base'}`}>
							{lecturer.name}
						</h2>
						<div
							className={`flex items-center text-gray-500 text-sm ml-1 ${
								rank === 1 ? 'text-white' : ''
							}`}>
							<FaUser className='inline mr-1' />
							{reviews.length ?? 0} ratings
						</div>
					</div>
				</div>
				<div className='flex flex-col items-center mb-2 lg:mb-0'>
					<span className='text-yellow-400 text-2xl mb-1'>
						<FaStar />
					</span>
					<p className={`font-bold ${rank === 1 ? 'text-lg' : 'text-base'}`}>
						{typeof lecturer.avgRating === 'number'
							? lecturer.avgRating.toFixed(1)
							: 'N/A'}
					</p>
				</div>
				<button
					className={`bg-teal-500 text-white text-sm px-3 py-2 rounded-full focus:outline-none ml-0 lg:ml-4 ${
						rank === 1 ? 'hover:text-teal-100' : 'hover:text-teal-700'
					}`}
					onClick={handleModal}>
					<FaCommentAlt className='inline mr-1' /> View ({reviews.length || 0})
				</button>
			</div>
			{showModal && (
				<LecturerModal
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
