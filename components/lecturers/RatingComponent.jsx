import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FaStar, FaCheck, FaComment, FaThumbsUp } from 'react-icons/fa'
import { RiArrowGoBackLine } from 'react-icons/ri'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import LoginModal from '../LoginRegister'

function RatingComponent({ onSubmit, lecturerName, attributeNames }) {
	const {
		error,
		loading,
		user: loggedInUser,
	} = useSelector((state) => state.authReducer)
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
	const [openLoginModal, setOpenLoginModal] = useState(false)

	const handleRating = (attribute, rating) => {
		if (attribute.toLowerCase().includes('applicability')) {
			setRatings((prevRatings) => ({
				...prevRatings,
				rwa: rating,
			}))
		} else {
			setRatings((prevRatings) => ({
				...prevRatings,
				[attribute]: rating,
			}))
		}
	}

	const handleComment = (event) => {
		setComment(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if (!loggedInUser) {
			// Prompt user to log in
			alert('Please log in to submit a rating.')
			return
		}
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

	useEffect(() => {
		if (loggedInUser) {
			setOpenLoginModal(false)
		}
	}, [loggedInUser])

	return (
		<div className='flex flex-col items-center bg-gray-100'>
			<div className='flex items-center justify-between w-full max-w-screen-lg p-4'>
				{/* <span className='text-lg font-medium text-gray-800'>
					{lecturerName}
				</span>
				<div className='w-8'></div> */}
			</div>
			{openLoginModal && (
				<LoginModal
					open={openLoginModal}
					onClose={() => setOpenLoginModal(false)}
				/>
			)}
			<div className='flex-grow flex flex-col items-center justify-center px-4'>
				{!submitted ? (
					<div className='w-full max-w-lg'>
						<form onSubmit={handleSubmit}>
							<div className='flex flex-col space-y-4 mb-6'>
								{attributeNames.map((name, index) => (
									<div key={index} className='flex items-center space-x-4'>
										<label
											htmlFor={`rating-${
												name.toLowerCase().includes('applicability')
													? 'rwa'
													: name.toLowerCase()
											}`}
											className='w-28 font-medium text-gray-800'>
											{name}
										</label>
										<div className='flex items-center space-x-1'>
											{ratingLevels.map((level, index) => (
												<button
													key={index}
													type='button'
													className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-800 focus:outline-none ${
														ratings[
															name.toLowerCase().includes('applicability')
																? 'rwa'
																: name.toLowerCase()
														] ===
														index + 1
															? 'bg-teal-500 text-white'
															: 'bg-white hover:bg-gray-200'
													}`}
													onClick={() =>
														handleRating(
															name.toLowerCase().includes('applicability')
																? 'rwa'
																: name.toLowerCase(),
															index + 1
														)
													}>
													{' '}
													{index + 1}{' '}
												</button>
											))}{' '}
										</div>{' '}
									</div>
								))}{' '}
								<div className='flex flex-col'>
									{' '}
									<label
										htmlFor='comment'
										className='font-medium text-gray-800'>
										{' '}
										Comment{' '}
									</label>{' '}
									<textarea
										id='comment'
										className='h-12 py-1 px-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
										value={comment}
										onChange={handleComment}></textarea>{' '}
								</div>{' '}
								{loggedInUser ? (
									<button
										type='submit'
										className='bg-teal-500 text-white rounded-md py-2 px-4 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'>
										Submit
									</button>
								) : (
									<div className='flex-grow flex items-center justify-center'>
										<span className='text-lg font-medium text-gray-800'>
											Please log in to submit a rating.
										</span>
										<span
											onClick={() => setOpenLoginModal(true)}
											className='cursor-pointer text-gray-600 rounded-md px-2 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'>
											Login
										</span>
									</div>
								)}
							</div>{' '}
						</form>{' '}
					</div>
				) : (
					<div className='w-full max-w-lg'>
						{' '}
						<div className='bg-white rounded-lg shadow-lg p-6'>
							{' '}
							<div className='flex items-center space-x-4 mb-4'>
								{' '}
								<FaCheck className='text-green-500' size={24} />{' '}
								<span className='text-lg font-medium text-gray-800'>
									{' '}
									Thanks for your rating,{' '}
									{loggedInUser ? loggedInUser.name : 'Anonymous'}!{' '}
								</span>{' '}
							</div>{' '}
							<div className='flex items-center space-x-4 mb-2'>
								{' '}
								<span className='font-medium text-gray-800'>
									Overall Rating:
								</span>{' '}
								<span className='flex items-center space-x-2'>
									{' '}
									{Array.from({ length: 5 }).map((_, index) => (
										<FaStar
											key={index}
											className={`text-2xl ${
												index < Math.floor(getOverallRating())
													? 'text-yellow-500'
													: 'text-gray-300'
											}`}
										/>
									))}
									<span className='font-medium text-gray-800'>
										{getOverallRating().toFixed(2)}
									</span>
								</span>
							</div>
							<div className='flex items-center space-x-4 mb-4'>
								<FaThumbsUp className='text-green-500' size={24} />
								<span className='font-medium text-gray-800'>
									Your rating has been approved and added to the list!
								</span>
							</div>
							<button
								className='flex items-center space-x-2 text-teal-500 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
								onClick={() => setSubmitted(false)}>
								<RiArrowGoBackLine size={24} />
								<span>Back to ratings form</span>
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

RatingComponent.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	lecturerName: PropTypes.string.isRequired,
	attributeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default RatingComponent
