import React, { useState, useRef } from 'react'
import { FaStar, FaUser } from 'react-icons/fa'
import ReviewElement from '../molecules/ReviewElement'
import RatingComponent from './RatingComponent'
import { useDispatch, useSelector } from 'react-redux'
import { addReview } from '../../actions/reviewActions'
import LoadingScreen from '../molecules/LoadingScreen'

function LecturerModal({
	lecturer,
	rank,
	handleCloseModal,
	reviews,
	course,
	reviewLoading,
	userData,
}) {
	const [newReview, setNewReview] = useState(null)
	const [isBannerVisible, setIsBannerVisible] = useState(false)
	const timerRef = useRef(null)
	const dispatch = useDispatch()
	const lecReviews =
		reviews.length > 0
			? reviews?.filter(
					(review) =>
						review.lecturer === lecturer?._id && review.course === course._id
			  )
			: []

	//sort lecReviews by updatedAt
	lecReviews.sort((a, b) => {
		return new Date(b.updatedAt) - new Date(a.updatedAt)
	})
	// Calculate average rating for each attribute
	const ratings = [
		'Coolness',
		'Grading',
		'Workload',
		'Expertise',
		'Real-world Applicability',
	]
	const ratingAverages = {}
	ratings.forEach((rating) => {
		const ratingSum = lecReviews.reduce((acc, review) => {
			return acc + review.rating[rating]
		}, 0)
		ratingAverages[rating] = ratingSum / lecReviews.length
	})

	// Calculate total average rating
	const totalRatingSum = lecReviews.reduce((acc, review) => {
		return (
			acc +
			Object.values(review.rating).reduce((total, val) => {
				return total + val
			}, 0)
		)
	}, 0)
	const totalRatingAvg = totalRatingSum / (lecReviews.length * ratings.length)

	// Define icon styles
	const iconStyle = 'text-3xl mr-2'
	const greenIconStyle = `${iconStyle} text-green-500`
	const yellowIconStyle = `${iconStyle} text-yellow-500`
	const tealIconStyle = `${iconStyle} text-teal-500`
	const redIconStyle = `${iconStyle} text-red-500`

	// Define progress bar styles
	const progressBarStyle = 'h-3 w-full rounded-full bg-gray-200'
	const greenProgressBarStyle = `${progressBarStyle} bg-green-500`
	const yellowProgressBarStyle = `${progressBarStyle} bg-yellow-500`
	const tealProgressBarStyle = `${progressBarStyle} bg-teal-500`
	const redProgressBarStyle = `${progressBarStyle} bg-red-500`

	// Define circular progress styles
	const circleStyle =
		'relative inline-flex rounded-full w-20 h-20 justify-center items-center mr-4'
	const circleShadowStyle =
		'absolute inset-0 rounded-full shadow-md bg-gray-100 pointer-events-none'
	const circlePercentStyle =
		'absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-600 rounded-full shadow-md'
	const circleTextStyle =
		'font-bold text-sm text-gray-600 z-10 flex justify-center items-center'

	const addNewReview = (review) => {
		setNewReview(review)
		setIsBannerVisible(true)
		setIsReviewAdded(true)
		if (timerRef.current) {
			clearTimeout(timerRef.current)
		}
		timerRef.current = setTimeout(() => {
			setIsBannerVisible(false)
		}, 5000)
	}

	const handleSubmitReview = (newReview) => {
		const review = {
			...newReview,
			lecturerId: lecturer._id,
		}

		const courseId = course._id.toString()

		const uniId = userData.university.toString()
		const userId = userData._id.toString()

		dispatch(addReview(courseId, review, userId, uniId)).then(() => {
			setIsReviewAdded(false)
		})
		addNewReview(review)
	}

	const banner = (
		<div className='fixed top-0 left-0 w-full bg-teal-500 text-white text-center p-2 py-8 z-50'>
			New review added!
		</div>
	)

	const [isReviewAdded, setIsReviewAdded] = useState(false)

	const ReviewSection = () => {
		return (
			<div className='mb-4'>
				<p className='text-lg font-medium mb-2'>Reviews</p>
				{reviewLoading ? (
					<LoadingScreen />
				) : (
					<>
						{lecReviews.length === 0 && (
							<p className='text-gray-500'>No reviews yet.</p>
						)}
						<>
							{lecReviews?.length > 0 &&
								lecReviews?.map((review, idx) => (
									<ReviewElement
										key={review._id ?? idx}
										user={review.user}
										loggedInUserData={userData}
										review={review}
									/>
								))}
						</>
						{isReviewAdded && (
							<div className='fixed top-0 left-0 w-full bg-teal-500 text-white text-center p-2 z-50'>
								New review added!
							</div>
						)}
					</>
				)}
			</div>
		)
	}

	return (
		<div
			className='fixed overflow-y-auto inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50'
			onClick={handleCloseModal}>
			{isBannerVisible && banner}
			<div
				className='bg-white grid grid-cols-1 md:grid-cols-2 rounded-lg p-6 max-w-3xl w-full max-h-screen overflow-hidden overflow-y-scroll mt-20'
				onClick={(e) => e.stopPropagation()}>
				<div
					className='absolute
					top-8 right-0
					m-4
					'>
					<button
						className='text-gray-500 hover:text-gray-700'
						onClick={handleCloseModal}>
						<svg
							className='h-6 w-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>
				<div>
					<div className=' items-center mb-4'>
						<h2 className='text-2xl font-medium'>
							#{rank}. {lecturer?.name}
						</h2>
						<p className=' text-gray-500'>{course.code}</p>
					</div>
					<div className='flex items-center mb-4'>
						<div className={circleStyle}>
							<div className={circleShadowStyle}></div>
							<div
								className={circlePercentStyle}
								style={{
									transform: `rotate(${totalRatingAvg * 1.8}deg)`,
								}}></div>
							<div className={circleTextStyle}>{`${lecturer?.avgRating.toFixed(
								1
							)}/5.0`}</div>
						</div>
						<div>
							<p className='text-lg font-medium'>{`${lecturer?.avgRating.toFixed(
								1
							)}/5.0`}</p>
							<p className='text-sm text-gray-500'>{`${
								lecReviews.length
							} review${lecReviews.length !== 1 ? 's' : ''}`}</p>
						</div>
					</div>
					<div className='flex flex-wrap items-center mb-4'>
						<div className='flex items-center mb-2 mr-4'>
							<FaStar className={greenIconStyle} />
							<div className='w-full relative'>
								<div
									className={greenProgressBarStyle}
									style={{ width: `${ratingAverages.coolness * 20}%` }}></div>
							</div>
						</div>
						<div className='flex items-center mb-2 mr-4'>
							<FaStar className={yellowIconStyle} />
							<div className='w-full relative'>
								<div
									className={yellowProgressBarStyle}
									style={{ width: `${ratingAverages.grading * 20}%` }}></div>
							</div>
						</div>
						<div className='flex items-center mb-2 mr-4'>
							<FaStar className={tealIconStyle} />
							<div className='w-full relative'>
								<div
									className={tealProgressBarStyle}
									style={{ width: `${ratingAverages.workload * 20}%` }}></div>
							</div>
						</div>
						<div className='flex items-center mb-2 mr-4'>
							<FaStar className={redIconStyle} />
							<div className='w-full relative'>
								<div
									className={redProgressBarStyle}
									style={{ width: `${ratingAverages.expertise * 20}%` }}></div>
							</div>
						</div>
						<div className='flex items-center mb-2 mr-4'>
							<FaUser className={iconStyle} />
							<div className='w-full relative'>
								<div
									className={progressBarStyle}
									style={{ width: `${ratingAverages.rwa * 20}%` }}></div>
							</div>
						</div>
					</div>
					<div className='hidden md:block'>
						<ReviewSection />
					</div>
				</div>

				<div className='relative'>
					<RatingComponent
						onSubmit={handleSubmitReview}
						lecturerName={lecturer.name}
						attributeNames={ratings}
						courseUniversity={course?.university?.toString()}
						course={course}
						handleCloseModal={handleCloseModal}
						userData={userData}
					/>
					<div className='block md:hidden'>
						<ReviewSection />
					</div>
				</div>
			</div>
		</div>
	)
}

export default LecturerModal
