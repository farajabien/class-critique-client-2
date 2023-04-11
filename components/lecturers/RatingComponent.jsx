import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FaStar, FaCheck, FaComment, FaThumbsUp } from 'react-icons/fa'
import { RiArrowGoBackLine } from 'react-icons/ri'

function RatingComponent({ onSubmit, lecturerName, attributeNames }) {
	// Use object destructuring to initialize ratings state
	const [ratings, setRatings] = useState({
		coolness: 0,
		grading: 0,
		workload: 0,
		expertise: 0,
		rwa: 0,
	})

	const [comment, setComment] = useState('')
	const [submitted, setSubmitted] = useState(false)

	const handleRating = (attribute, rating) => {
		setRatings((prevRatings) => ({
			...prevRatings,
			[attribute]: rating,
		}))
	}

	const handleComment = (event) => {
		setComment(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		onSubmit({ ratings, text: comment })
		setSubmitted(true)
	}

	const ratingLevels = ['Poor', 'Fair', 'Average', 'Good', 'Excellent']

	// Use a separate function to calculate the overall rating
	const getOverallRating = () => {
		const sum = Object.values(ratings).reduce((acc, rating) => acc + rating, 0)
		const count = Object.values(ratings).length
		return sum / count
	}

	return (
		<div className='flex flex-col items-center bg-gray-100'>
			<div className='flex items-center justify-between w-full max-w-screen-lg p-4'>
				{/* <span className='text-lg font-medium text-gray-800'>
					{lecturerName}
				</span>
				<div className='w-8'></div> */}
			</div>
			<div className='flex-grow flex flex-col items-center justify-center px-4'>
				{!submitted ? (
					<div className='w-full max-w-lg'>
						<form onSubmit={handleSubmit}>
							<div className='flex flex-col space-y-4 mb-6'>
								{attributeNames.map((name, index) => (
									<div key={index} className='flex items-center space-x-4'>
										<label
											htmlFor={`rating-${name.toLowerCase()}`}
											className='w-28 font-medium text-gray-800'>
											{name}
										</label>
										<div className='flex items-center space-x-1'>
											{ratingLevels.map((level, index) => (
												<button
													key={index}
													type='button'
													className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-800 focus:outline-none ${
														ratings[name.toLowerCase()] === index + 1
															? 'bg-teal-500 text-white'
															: 'bg-gray-200 hover:bg-teal-500 hover:text-white'
													}`}
													onClick={() =>
														handleRating(name.toLowerCase(), index + 1)
													}>
													{index + 1}
												</button>
											))}
										</div>
									</div>
								))}
								<div className='flex flex-col'>
									<label
										htmlFor='comment'
										className='text-gray-800 font-medium'>
										Comment (optional)
									</label>
									<textarea
										id='comment'
										name='comment'
										rows='3'
										className='mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
										value={comment}
										onChange={handleComment}></textarea>
								</div>
							</div>
							<button
								type='submit'
								className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'>
								Submit
							</button>
						</form>
					</div>
				) : (
					<div className='w-full max-w-lg text-center'>
						<h2 className='text-3xl font-bold mb-4 text-gray-800'>
							Thank you for rating {lecturerName}!
						</h2>
						<div className='flex items-center justify-center space-x-2'>
							<button
								className='bg-white text-teal-500 py-2 px-4 border border-teal-500 rounded-md shadow-sm text-sm font-medium hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
								onClick={() => setSubmitted(false)}>
								<RiArrowGoBackLine className='inline-block h-5 w-5 mr-1' />
								Edit Rating
							</button>
						</div>

						<div className='mt-6'>
							<span className='text-xl font-medium text-gray-800'>
								Overall rating:
							</span>
							<div className='flex items-center justify-center space-x-1 mt-1 mb-5'>
								<div
									className={`px-5 py-2 text-white rounded-full text-lg font-medium ${
										getOverallRating() < 1
											? 'bg-red-500'
											: getOverallRating() < 2
											? 'bg-orange-500'
											: getOverallRating() < 3
											? 'bg-yellow-500'
											: getOverallRating() < 4
											? 'bg-green-500'
											: 'bg-teal-600'
									}`}>
									{getOverallRating().toFixed(1)}
								</div>
								<div className='text-gray-500 text-sm font-medium ml-2 '>
									{getOverallRating() < 1
										? 'Poor'
										: getOverallRating() < 2
										? 'Fair'
										: getOverallRating() < 3
										? 'Average'
										: getOverallRating() < 4
										? 'Good'
										: 'Excellent'}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default RatingComponent
