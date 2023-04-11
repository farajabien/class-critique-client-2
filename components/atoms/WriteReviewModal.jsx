import React, { useState } from 'react'
import StarRating from '../atoms/StarRating'

function WriteReviewModal({
	lecturer,
	course,
	handleCloseModal,
	handleSaveReview,
}) {
	const [coolnessRating, setCoolnessRating] = useState(0)
	const [gradingRating, setGradingRating] = useState(0)
	const [workloadRating, setWorkloadRating] = useState(0)
	const [expertiseRating, setExpertiseRating] = useState(0)
	const [rwaRating, setRwaRating] = useState(0)
	const [comment, setComment] = useState('')

	const handleSaveClick = () => {
		const review = {
			lecturer: lecturer._id,
			course: course._id,
			rating: {
				coolness: coolnessRating,
				grading: gradingRating,
				workload: workloadRating,
				expertise: expertiseRating,
				rwa: rwaRating,
			},
			comment: comment,
		}
		handleSaveReview(review)
		handleCloseModal()
	}

	const handleCancelClick = () => {
		handleCloseModal()
	}

	return (
		<div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50'>
			<div className='bg-white rounded-lg p-6 max-w-3xl w-full overflow-hidden'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-2xl font-medium'>
						Write a review for {lecturer.name}
					</h2>
					<button
						className='text-gray-500 hover:text-gray-800 focus:outline-none'
						onClick={handleCancelClick}>
						Cancel
					</button>
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 font-bold mb-2'
						htmlFor='coolnessRating'>
						Coolness
					</label>
					<StarRating value={coolnessRating} setValue={setCoolnessRating} />
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 font-bold mb-2'
						htmlFor='gradingRating'>
						Grading
					</label>
					<StarRating value={gradingRating} setValue={setGradingRating} />
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 font-bold mb-2'
						htmlFor='workloadRating'>
						Workload
					</label>
					<StarRating value={workloadRating} setValue={setWorkloadRating} />
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 font-bold mb-2'
						htmlFor='expertiseRating'>
						Expertise
					</label>
					<StarRating value={expertiseRating} setValue={setExpertiseRating} />
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 font-bold mb-2'
						htmlFor='rwaRating'>
						Responsiveness/Willingness to help
					</label>
					<StarRating value={rwaRating} setValue={setRwaRating} />
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 font-bold mb-2'
						htmlFor='comment'>
						Comment
					</label>
					<textarea
						id='comment'
						className='form-textarea mt-1 block w-full'
						rows='3
            '
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
				</div>
				<div className='flex justify-end'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4'
						onClick={handleSaveClick}>
						Save
					</button>
					<button
						className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						onClick={handleCancelClick}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}

export default WriteReviewModal
