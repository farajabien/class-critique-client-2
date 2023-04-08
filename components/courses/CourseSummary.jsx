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
		<div>
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
						<div className='grid grid-cols-2 gap-6'>
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
											background: {
												fill: '#F5F5F5',
											},
										}}
									/>
									<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
										<div className='flex items-center'>
											<div>
												{/* <span className='font-bold text-2xl'>
													{Math.round(average * 10)}
												</span> */}
												<br />
												<span className='text-xs font-light'>Out of 10</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='mt-4'>
								<h4 className='text-gray-600 font-medium mb-2'>
									Attribute Ratings
								</h4>
								<div className='flex items-center mb-2'>
									<div className='w-6 h-6 rounded-full bg-gray-300 mr-2'></div>
									<div className='w-1/2'>
										<div className='bg-gray-100 rounded-full h-2'></div>
									</div>
									<div className='w-1/2 text-right text-gray-500 font-medium'>
										Communication
									</div>
								</div>
								<div className='flex items-center mb-2'>
									<div className='w-6 h-6 rounded-full bg-green-300 mr-2'></div>
									<div className='w-1/2'>
										<div className='bg-green-100 rounded-full h-2'></div>
									</div>
									<div className='w-1/2 text-right text-gray-500 font-medium'>
										Preparation
									</div>
								</div>
								<div className='flex items-center mb-2'>
									<div className='w-6 h-6 rounded-full bg-yellow-300 mr-2'></div>
									<div className='w-1/2'>
										<div className='bg-yellow-100 rounded-full h-2'></div>
									</div>
									<div className='w-1/2 text-right text-gray-500 font-medium'>
										Engagement
									</div>
								</div>
								<div className='flex items-center mb-2'>
									<div className='w-6 h-6 rounded-full bg-blue-300 mr-2'></div>
									<div className='w-1/2'>
										<div className='bg-blue-100 rounded-full h-2'></div>
									</div>
									<div className='w-1/2 text-right text-gray-500 font-medium'>
										Knowledge
									</div>
								</div>
								<div className='flex items-center mb-2'>
									<div className='w-6 h-6 rounded-full bg-purple-300 mr-2'></div>
									<div className='w-1/2'>
										<div className='bg-purple-100 rounded-full h-2'></div>
									</div>
									<div className='w-1/2 text-right text-gray-500 font-medium'>
										Organization
									</div>
								</div>
								<div className='flex items-center mb-2'>
									<div className='w-6 h-6 rounded-full bg-pink-300 mr-2'></div>
									<div className='w-1/2'>
										<div className='bg-pink-100 rounded-full h-2'></div>
									</div>
									<div className='w-1/2 text-right text-gray-500 font-medium'>
										Helpfulness
									</div>
								</div>
							</div>
						</div>
						{/* AVERAGE */}
						<div className='grid grid-cols-2 gap-6'></div>
						{/* REVIEWS */}
						<div className='flex justify-between items-center mt-6'>
							<div className='flex items-center'>
								<h3 className='text-lg font-medium mr-2'>Reviews</h3>
								<button
									className='text-gray-500 hover:text-gray-800 focus:outline-none'
									onClick={() => setShowReviews(!showReviews)}>
									{showReviews ? 'Hide' : 'Show'}
								</button>
							</div>
							<button
								className='bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full text-sm focus:outline-none'
								onClick={handleWriteReview}>
								Write a review
							</button>
						</div>
						{showReviews && (
							<div className='mt-4'>
								{comments.length > -1 ? (
									<CommentElement />
								) : (
									<p className='text-gray-500'>No comments yet</p>
								)}
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default CourseSummary
