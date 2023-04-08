import React from 'react'
import {
	FaCommentAlt,
	FaFacebook,
	FaLinkedin,
	FaStar,
	FaTimes,
	FaTwitter,
	FaUser,
} from 'react-icons/fa'

function LecturerModal({ lecturer, handleCloseModal, handleWriteReview }) {
	return (
		<div
			className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50'
			onClick={handleCloseModal}>
			<div
				className='bg-white rounded-lg p-6 max-w-3xl w-full overflow-hidden'
				onClick={(e) => e.stopPropagation()}>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-2xl font-medium'>{lecturer.name}</h2>
					<button
						className='text-gray-500 hover:text-gray-800 focus:outline-none'
						onClick={handleCloseModal}>
						<FaTimes />
					</button>
				</div>
				<div className='grid grid-cols-2 gap-6'>
					<div>
						<h3 className='text-lg font-medium mb-2'>Lecturer Info</h3>
						<div className='flex items-center mb-2'>
							<span className='text-yellow-400 mr-1'>
								<FaStar />
							</span>
							<p className='font-medium'>{lecturer.averageRating.toFixed(1)}</p>
						</div>
						<div className='flex items-center mb-2'>
							<span className='text-gray-400 mr-2'>
								<FaUser />
							</span>
							<p className='font-medium'>{lecturer.numRatings} ratings</p>
						</div>
						<div className='flex items-center mb-4'>
							<span className='text-gray-400 mr-2'>
								<FaCommentAlt />
							</span>
							<p className='font-medium'>{lecturer.numReviews} reviews</p>
						</div>
					</div>
					<div>
						<h3 className='text-lg font-medium mb-2'>Attributes</h3>
						<div className='flex items-center mb-2'>
							<div className='w-20 mr-4'>
								<p className='text-sm text-gray-600'>Knowledge</p>
							</div>
							<div className='bg-green-400 h-3 w-20 rounded-full'></div>
						</div>
						<div className='flex items-center mb-2'>
							<div className='w-20 mr-4'>
								<p className='text-sm text-gray-600'>Teaching</p>
							</div>
							<div className='bg-yellow-400 h-3 w-16 rounded-full'></div>
						</div>
						<div className='flex items-center mb-2'>
							<div className='w-20 mr-4'>
								<p className='text-sm text-gray-600'>Communication</p>
							</div>
							<div className='bg-teal-400 h-3 w-12 rounded-full'></div>
						</div>
						<div className='flex items-center mb-2'>
							<div className='w-20 mr-4'>
								<p className='text-sm text-gray-600'>Passion</p>
							</div>
							<div className='bg-red-400 h-3 w-8 rounded-full'></div>
						</div>
						<div className='flex items-center mb-2'>
							<div className='w-20 mr-4'>
								<p className='text-sm text-gray-600'>Punctuality</p>
							</div>
							<div className='bg-purple-400 h-3 w-4 rounded-full'></div>
						</div>
					</div>
				</div>
				<div className='flex items-center justify-between mt-6'>
					<button
						className='bg-teal-500 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline-teal'
						onClick={handleWriteReview}>
						Write a review
					</button>
					<div className='flex items-center'>
						<p className='text-gray-400 text-sm mr-2'>Share:</p>
						<div className='flex items-center'>
							<a href='#' className='text-gray-500 hover:text-gray-800'>
								<FaFacebook />
							</a>
							<a href='#' className='text-gray-500 hover:text-gray-800 ml-2'>
								<FaTwitter />
							</a>
							<a href='#' className='text-gray-500 hover:text-gray-800 ml-2'>
								<FaLinkedin />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LecturerModal
