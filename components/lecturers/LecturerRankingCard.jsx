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
			className={`shadow-lg rounded-lg p-4 mb-2 ${
				rank === 1 ? 'bg-teal-500' : 'bg-white'
			}`}>
			<div className='flex flex-col lg:flex-row justify-between items-center'>
				<div className='flex items-center mb-2 lg:mb-0'>
					<div
						className={`font-bold mr-2 ${
							rank === 1 ? 'text-3xl' : 'text-2xl'
						}`}>
						{rank}.
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
							{lecturer.numRatings ?? 0} ratings
						</div>
					</div>
				</div>
				<div className='flex flex-col items-center mb-2 lg:mb-0'>
					<span className='text-yellow-400 text-2xl mb-1'>
						<FaStar />
					</span>
					<p className={`font-bold ${rank === 1 ? 'text-lg' : 'text-base'}`}>
						{lecturer.averageRating.toFixed(1)}
					</p>
				</div>
				<button
					className={`bg-teal-500 text-white text-sm px-3 py-2 rounded-full focus:outline-none ml-0 lg:ml-4 ${
						rank === 1 ? 'hover:text-teal-100' : 'hover:text-teal-700'
					}`}
					onClick={handleModal}>
					<FaCommentAlt className='inline mr-1' /> View (
					{lecturer.numRatings ?? 0})
				</button>
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
