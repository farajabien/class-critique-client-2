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

	return (
		<div
			className='bg-white rounded-lg p-6 max-w-3xl w-full overflow-hidden'
			onClick={(e) => e.stopPropagation()}>
			{courseLoading ? (
				<LoadingScreen />
			) : (
				<>
					{' '}
					<div className='flex justify-between items-center mb-4'>
						<h2 className='text-2xl font-medium'>
							{course?.code} - {course?.name}
						</h2>
						<button
							className='text-gray-500 hover:text-gray-800 focus:outline-none'
							onClick={handleCloseModal}>
							<FaTimes />
						</button>
					</div>
					{/* COURSE SUMMARY */}
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
						<LecturerQuality reviews={reviews} />
						<div>
							<h3 className='text-lg font-medium mb-4'>Attributes</h3>
							{courseSummaryData.map((item) => (
								<div
									key={item.label}
									className='flex items-center justify-between mb-2'>
									<div className='flex items-center'>
										<div
											className='w-8 h-8 flex items-center justify-center rounded-full mr-3'
											style={{ backgroundColor: item.color }}>
											{/* {item.icon} */}
											<span className='font-medium'>
												{item.value.toFixed(1)}
											</span>
										</div>
										<div>
											<span className='font-medium'>{item.label}</span>{' '}
											<p className='text-sm text-gray-500'>
												{item.description}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* REVIEWS */}
					<div className='mt-8'>
						<div className='flex items-center justify-between mb-4'>
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
