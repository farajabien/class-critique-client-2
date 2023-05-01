import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FaStar, FaCheck, FaComment, FaThumbsUp } from 'react-icons/fa'
import { RiArrowGoBackLine } from 'react-icons/ri'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { SignIn, SignInButton, useUser } from '@clerk/nextjs'
import { getReview } from '../../actions/reviewActions'

function RatingComponent({
	onSubmit,
	courseUniversity,
	attributeNames,
	lecturerName,
	course,
	userData,
}) {
	const dispatch = useDispatch()
	const { user, isLoading } = useUser()
	const {
		error,
		loading,
		user: loggedInUser,
	} = useSelector((state) => state.authReducer)
	const { courseReviews, error: reviewError } = useSelector(
		(state) => state.reviewReducer
	)

	const userReview =
		courseReviews.find((review) => review.user._id === userData?._id) ?? null

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
	const [userUniversity, setUserUniversity] = useState('')
	const [hasReviewed, setHasReviewed] = useState(Boolean(userReview))

	useEffect(() => {
		if (userData) {
			setUserUniversity(userData.university)
		}
	}, [userData])

	useEffect(() => {
		if (userReview) {
			setRatings({
				coolness: userReview.rating.coolness,
				grading: userReview.rating.grading,
				workload: userReview.rating.workload,
				expertise: userReview.rating.expertise,
				rwa: userReview.rating.rwa,
			})
			setComment(userReview.text)
		}
		setHasReviewed(Boolean(userReview))
	}, [userReview])

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

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (!user) {
			return
		}
		await onSubmit({
			ratings,
			text: comment.length > 0 ? comment : 'N/A',
		})
		setSubmitted(true)
	}

	const ratingLevels = ['Poor', 'Fair', 'Average', 'Good', 'Excellent']

	return (
		<div className='flex flex-col items-center bg-gray-100'>
			<div className='flex items-center justify-between w-full max-w-screen-lg p-4'></div>
			<div className='flex items-center justify-between mb-4'>
				<p className='text-lg font-medium text-gray-800'>
					Submit Rating on
					<span className='text-teal-500'> {lecturerName}</span>
					<span className='text-gray-500'> ({course.code})</span>
				</p>
			</div>
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
						<label htmlFor='comment' className='font-medium text-gray-800'>
							{' '}
							Comment{' '}
						</label>{' '}
						<textarea
							id='comment'
							className='h-12 py-1 px-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
							value={comment}
							onChange={handleComment}></textarea>{' '}
					</div>{' '}
					{user ? (
						<>
							{userData && userUniversity === courseUniversity ? (
								<>
									{userData.role !== 'admin' &&
									userData.role !== 'universityAdmin' ? (
										<button
											type='submit'
											disabled={
												!ratings.coolness ||
												!ratings.expertise ||
												!ratings.grading ||
												!ratings.rwa ||
												!ratings.workload
											}
											className='bg-teal-300 hover:bg-teal-500 text-gray-800 font-medium py-1 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'>
											Submit
										</button>
									) : (
										<div className='flex-grow flex items-center justify-center cursor-default'>
											<span className='text-lg font-medium text-gray-800'>
												Admins cannot submit ratings.
											</span>
										</div>
									)}
								</>
							) : (
								<div className='flex-grow flex items-center justify-center'>
									<span className='text-lg font-medium text-gray-800'>
										You can only submit ratings for courses at your university.
									</span>
								</div>
							)}
						</>
					) : (
						<div className='flex-grow flex items-center justify-center'>
							<span className='text-lg font-medium text-gray-800'>
								Please log in to submit a rating.
							</span>
							<SignInButton
								mode='modal'
								redirectUrl={`
												${window.location.pathname}${window.location.search}
											`}
								className='rounded-full py-1 px-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
							/>
						</div>
					)}
				</div>{' '}
			</form>
		</div>
	)
}

RatingComponent.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	courseUniversity: PropTypes.string.isRequired,
	attributeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default RatingComponent
