import React, { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import {
	FaClock,
	FaCommentAlt,
	FaHeart,
	FaStar,
	FaTimes,
	FaUser,
} from 'react-icons/fa'
import ReviewElement from '../molecules/ReviewElement'
import LoadingScreen from '../molecules/LoadingScreen'
import LecturerQuality from '../lecturers/LecturerQuality'

function CourseSummary({
	course,
	lecturers,
	handleCloseModal,
	handleWriteReview,
	courseLoading,
	reviews,
	reviewLoading,
}) {
	//function to get lec from lecturers array by lecid and return name
	const getLecName = (lecId) => {
		const lec = lecturers?.find((lec) => lec._id === lecId)
		return lec?.name
	}

	// Sample data for the course summary
	const courseSummaryData = [
		{
			label: 'Coolness',
			value: 4,
			color: '#66BB6A',
			icon: <FaStar />,
			description:
				'How friendly and approachable was the lecturer? Did they make the class enjoyable?',
		},
		{
			label: 'Grading',
			value: 5,
			color: '#FFD54F',
			icon: <FaUser />,
			description:
				'How well did the lecturer grade assignments and tests? Did they provide helpful feedback?',
		},
		{
			label: 'Workload',
			value: 3,
			color: '#26A69A',
			icon: <FaCommentAlt />,
			description:
				'Was the course workload manageable? Did you have enough time to complete assignments and keep up with classwork?',
		},
		{
			label: 'Expertise',
			value: 4,
			color: '#EF5350',
			icon: <FaHeart />,
			description:
				'How smart and knowledgeable was the lecturer in the course material? Were they able to explain the tricky stuff in a way that was easy to understand?',
		},
		{
			label: 'Real World Application',
			value: 5,
			color: '#AB47BC',
			icon: <FaClock />,
			description:
				'How applicable were the course concepts to the real world? Did the lecturer provide examples of how the material can be used in real-life situations?',
		},
	]

	// Calculate the average value for all the attributes
	const total = courseSummaryData.reduce((acc, curr) => acc + curr.value, 0)
	const average = total / courseSummaryData.length

	// State for showing/hiding reviews
	const [showReviews, setShowReviews] = useState(true)
	const [showDescription, setShowDescription] = useState(false)

	return (
		<div
			className='bg-white rounded-lg px-6 py-2 max-w-3xl w-full overflow-hidden'
			onClick={(e) => e.stopPropagation()}>
			{courseLoading ? (
				<LoadingScreen />
			) : (
				<>
					{' '}
					<div className='flex justify-between items-center mb-2'>
						<h2 className='text-2xl font-medium text-gray-700'>
							{course?.code} SUMMARY
						</h2>
						<button
							className='text-gray-500 hover:text-gray-800 focus:outline-none'
							onClick={handleCloseModal}>
							<FaTimes />
						</button>
					</div>
					{/* COURSE SUMMARY */}
					<div className='grid grid-cols-2 gap-6 md:grid-cols-2'>
						<LecturerQuality reviews={reviews} />
						<div>
							<h3 className='text-lg font-medium mb-4'>Attributes</h3>
							{courseSummaryData.map((item) => (
								<div key={item.label} className='mb-2'>
									<div
										className='flex items-center justify-between cursor-pointer'
										onClick={() =>
											setShowDescription(
												showDescription === item.label ? null : item.label
											)
										}>
										<div className='flex items-center'>
											<div
												className='w-8 h-8 flex items-center justify-center rounded-full mr-3'
												style={{ backgroundColor: item.color }}>
												<span className='font-medium'>
													{item.value.toFixed(1)}
												</span>
											</div>
											<div>
												<span className='font-medium'>{item.label}</span>
											</div>
										</div>
										<div>
											{showDescription === item.label ? (
												<svg
													className='w-4 h-4 text-gray-500'
													viewBox='0 0 20 20'
													fill='currentColor'>
													<path
														fillRule='evenodd'
														d='M5.293 6.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
														clipRule='evenodd'
													/>
												</svg>
											) : (
												<svg
													className='w-4 h-4 text-gray-500'
													viewBox='0 0 20 20'
													fill='currentColor'>
													<path
														fillRule='evenodd'
														d='M5.293 9.707a1 1 0 011.414 0L10 12.879l3.293-3.172a1 1 0 111.414 1.414l-4 3.857a1 1 0 01-1.414 0l-4-3.857a1 1 0 010-1.414z'
														clipRule='evenodd'
													/>
												</svg>
											)}
										</div>
									</div>
									{showDescription === item.label && (
										<p className='text-sm text-gray-500 mt-2'>
											{item.description}
										</p>
									)}
								</div>
							))}
						</div>
					</div>
					{/* REVIEWS */}
					<div className='mt-4'>
						<div className='flex items-center justify-between'>
							<h3 className='text-lg font-medium'>Reviews</h3>
							<button
								className='text-gray-500 hover:text-gray-800 focus:outline-none'
								onClick={() => setShowReviews(!showReviews)}>
								{showReviews ? 'Hide' : 'Show'} Reviews ({reviews.length})
							</button>
						</div>
						{reviewLoading ? (
							<LoadingScreen />
						) : (
							<>
								{showReviews && (
									<>
										{reviews.length > 0 ? (
											reviews.map((review, idx) => (
												<ReviewElement
													key={review._id ?? idx}
													username='Placeholder'
													targetLec={
														review.lecturer ? getLecName(review.lecturer) : ''
													}
													review={review}
												/>
											))
										) : (
											<p className=' text-gray-500'>No reviews yet.</p>
										)}
									</>
								)}
							</>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default CourseSummary
