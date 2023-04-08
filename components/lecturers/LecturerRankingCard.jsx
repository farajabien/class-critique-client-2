import React, { useState } from 'react'
import { FaStar, FaCommentAlt, FaUser } from 'react-icons/fa'
import LecturerModal from './LecturerModal'

const LecturerRankingCard = ({ lecturer, rank }) => {
	const [showModal, setShowModal] = useState(false)
	lecturer.averageRating = 4.5

	const handleModal = () => {
		setShowModal(!showModal)
	}

	return (
		<div
			className={`shadow-md rounded-lg p-4 mb-2 ${
				rank === 1 ? 'bg-teal-500' : 'bg-white'
			}`}>
			<div
				className={`flex justify-between items-center ${
					rank === 1 ? 'text-white' : 'bg-white'
				}`}>
				<div className='flex items-center'>
					<div className='text-2xl mr-2'>{rank}.</div>
					<div>
						<h2 className='text-lg font-medium'>{lecturer.name}</h2>
						<div className='flex items-center text-gray-600 text-sm ml-1'>
							{lecturer.numRatings ?? 0} ratings
						</div>
					</div>
				</div>
				<button
					className={`text-teal-500  focus:outline-none ${
						rank === 1
							? ' text-gray-50 hover:text-teal-100'
							: 'hover:text-teal-700'
					}`}
					onClick={handleModal}>
					<FaCommentAlt className='inline mr-1' /> View (
					{lecturer.numRatings ?? 0})
				</button>
			</div>
			<div
				className={`flex items-center ${
					rank === 1 ? 'text-white' : 'bg-white'
				}`}>
				<span className='text-yellow-400 mr-1'>
					<FaStar />
				</span>
				<p className='font-medium'>{lecturer.averageRating.toFixed(1)}</p>
			</div>
			{showModal && (
				<LecturerModal
					lecturer={lecturer}
					handleCloseModal={() => setShowModal(false)}
				/>
			)}
		</div>
	)
}

export default LecturerRankingCard
