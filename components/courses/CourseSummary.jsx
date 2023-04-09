import React, { useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import {
	FaClock,
	FaCommentAlt,
	FaFacebook,
	FaHeart,
	FaLinkedin,
	FaStar,
	FaTimes,
	FaTwitter,
	FaUser,
	FaUsers,
} from 'react-icons/fa'
import CommentElement from '../molecules/CommentElement'
import LoadingScreen from '../molecules/LoadingScreen'

function CourseSummary({
	lecturer,
	handleCloseModal,
	handleWriteReview,
	loading,
}) {
	const [comments, setComments] = useState([])
	// Sample data for the course summary
	const courseSummaryData = [
		{
			label: 'Knowledge',
			value: 8.5,
			color: '#66BB6A',
			icon: <FaStar />,
		},
		{
			label: 'Teaching',
			value: 7.5,
			color: '#FFD54F',
			icon: <FaUser />,
		},
		{
			label: 'Communication',
			value: 9.0,
			color: '#26A69A',
			icon: <FaCommentAlt />,
		},
		{
			label: 'Passion',
			value: 6.5,
			color: '#EF5350',
			icon: <FaHeart />,
		},
		{
			label: 'Punctuality',
			value: 8.0,
			color: '#AB47BC',
			icon: <FaClock />,
		},
	]

	// Calculate the average value for all the attributes
	const total = courseSummaryData.reduce((acc, curr) => acc + curr.value, 0)
	const average = total / courseSummaryData.length

	// State for showing/hiding reviews
	const [showReviews, setShowReviews] = useState(false)

	return (
		<div
			className='bg-white rounded-lg p-6 max-w-3xl w-full overflow-hidden'
			onClick={(e) => e.stopPropagation()}>
			{loading ? (
				<LoadingScreen />
			) : (
				<>
					{' '}
					<div className='flex justify-between items-center mb-4'>
						<h2 className='text-2xl font-medium'>{lecturer?.name}</h2>
						<button
							className='text-gray-500 hover:text-gray-800 focus:outline-none'
							onClick={handleCloseModal}>
							<FaTimes />
						</button>
					</div>
					{/* COURSE SUMMARY */}
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
						<div>
							<h3 className='text-lg font-medium mb-4'>
								Overall Lecturer Quality: {average.toFixed(1)}
							</h3>
							<div className='w-48 h-48 mx-auto relative'>
								<CircularProgressbar
									value={average * 10}
									text={`${average.toFixed(1)}`}
									strokeWidth={10}
									styles={{
										root: {
											width: '100%',
											height: '100%',
										},
										path: {
											stroke: '#26A69A',
											strokeLinecap: 'round',
										},
										text: {
											fill: '#26A69A',
											fontSize: '24px',
											fontWeight: 'bold',
											textAnchor: 'middle',
											dy: '0.35em',
										},
										trail: {
											stroke: '#D9D9D9',
											strokeLinecap: 'round',
										},
									}}
								/>
							</div>
						</div>
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
											{item.icon}
										</div>
										<span>{item.label}</span>
									</div>
									<span className='font-medium'>{item.value.toFixed(1)}</span>
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
								{showReviews ? 'Hide' : 'Show'} Reviews ({comments.length})
							</button>
						</div>
						{showReviews && (
							<>
								{comments.length > 0 ? (
									comments.map((comment) => (
										<CommentElement
											key={comment.id}
											username={comment.username}
											text={comment.text}
											date={comment.date}
										/>
									))
								) : (
									<p>No reviews yet.</p>
								)}
								<button
									className='mt-4 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md focus:outline-none'
									onClick={handleWriteReview}>
									Write a Review
								</button>
							</>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default CourseSummary
