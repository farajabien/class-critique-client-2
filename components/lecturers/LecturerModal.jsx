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
import CommentElement from '../molecules/CommentElement'

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
						className='text-gray-500 hover:text-gray-800 focus:outline-none ml-auto'
						onClick={handleCloseModal}>
						<FaTimes />
					</button>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='mb-4 md:mb-0'>
						<h3 className='text-lg font-medium mb-2'>Lecturer Info</h3>
						<div className='flex items-center mb-2'>
							<span className='text-teal-400 mr-1'>
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
						<div className='flex items-center justify-center'>
							<button
								className='bg-teal-400 hover:bg-teal-500 text-white font-medium px-4 py-2 rounded-lg focus:outline-none'
								onClick={handleWriteReview}>
								Write a Review
							</button>
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
							<div className='bg-teal-400 h-3 w-24 rounded-full'></div>
						</div>
						<div className='flex items-center mb-2'>
							<div className='w-20 mr-4'>
								<p className='text-sm text-gray-600'>Feedback</p>
							</div>
							<div className='bg-red-400 h-3 w-12 rounded-full'></div>
						</div>
					</div>
				</div>
				<div className='mt-6'>
					<h3 className='text-lg font-medium mb-2'>
						Reviews ({lecturer.numReviews ?? 0})
					</h3>
					{lecturer.reviews?.map((review) => (
						<CommentElement key={review.id} review={review} />
					))}
					<CommentElement />
				</div>
				<div className='mt-6'>
					<h3 className='text-lg font-medium mb-2'>Share</h3>
					<div className='flex items-center'>
						<a
							// href={https://www.facebook.com/sharer/sharer.php?u=${window.location.href}}
							target='_blank'
							rel='noopener noreferrer'
							className='text-gray-600 hover:text-gray-800 mr-4'>
							<FaFacebook />
						</a>
						<a
							// href={https://twitter.com/intent/tweet?url=${window.location.href}}
							target='_blank'
							rel='noopener noreferrer'
							className='text-gray-600 hover:text-gray-800 mr-4'>
							<FaTwitter />
						</a>
						<a
							// href={https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}}
							target='_blank'
							rel='noopener noreferrer'
							className='text-gray-600 hover:text-gray-800'>
							<FaLinkedin />
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LecturerModal
