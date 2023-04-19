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
	courseLoading,
	reviews,
	reviewLoading,
}) {
	//function to get lec from lecturers array by lecid and return name
	const getLecName = (lecId) => {
		const lec = lecturers?.find((lec) => lec._id === lecId)
		return lec?.name
	}

	// Calculate the values for all the attributes based on the reviews
	const [coolness, setCoolness] = useState(0)
	const [grading, setGrading] = useState(0)
	const [workload, setWorkload] = useState(0)
	const [expertise, setExpertise] = useState(0)
	const [realWorldApplication, setRealWorldApplication] = useState(0)
	const [totalAvg, setTotalAvg] = useState(0)

	useEffect(() => {
		if (reviews?.length > 0) {
			const ratings = reviews.reduce(
				(acc, curr) => {
					acc.coolness += curr.rating.coolness
					acc.grading += curr.rating.grading
					acc.workload += curr.rating.workload
					acc.expertise += curr.rating.expertise
					acc.realWorldApplication += curr.rating.rwa
					return acc
				},
				{
					coolness: 0,
					grading: 0,
					workload: 0,
					expertise: 0,
					realWorldApplication: 0,
				}
			)

			setCoolness(ratings.coolness / reviews.length)
			setGrading(ratings.grading / reviews.length)
			setWorkload(ratings.workload / reviews.length)
			setExpertise(ratings.expertise / reviews.length)
			setRealWorldApplication(ratings.realWorldApplication / reviews.length)
		}
	}, [reviews])

	useEffect(() => {
		if (coolness && grading && workload && expertise && realWorldApplication) {
			setTotalAvg(
				(coolness + grading + workload + expertise + realWorldApplication) / 5
			)
		}
	}, [coolness, grading, workload, expertise, realWorldApplication])

	// Sample data for the course summary
	const courseSummaryData = [
		{
			label: 'Coolness',
			value: coolness,
			color: '#66BB6A',
			icon: <FaStar />,
			description:
				'How friendly and approachable was the lecturer? Did they make the class enjoyable?',
		},
		{
			label: 'Grading',
			value: grading,
			color: '#FFD54F',
			icon: <FaUser />,
			description:
				'How well did the lecturer grade assignments and tests? Did they provide helpful feedback?',
		},
		{
			label: 'Workload',
			value: workload,
			color: '#26A69A',
			icon: <FaCommentAlt />,
			description:
				'Was the course workload manageable? Did you have enough time to complete assignments and keep up with classwork?',
		},
		{
			label: 'Expertise',
			value: expertise,
			color: '#FF7043',
			icon: <FaHeart />,
			description:
				'How knowledgeable was the lecturer? Did they provide useful information and resources?',
		},
		{
			label: 'Real World Application',
			value: realWorldApplication,
			color: '#42A5F5',
			icon: <FaClock />,
			description:
				'How relevant was the course material to the real world? Did the lecturer provide examples of how the course material could be applied in the real world?',
		},
	]

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
						<LecturerQuality reviews={reviews} average={totalAvg} />
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
												style={{
													backgroundColor:
														item.value >= 4.5
															? '#26A69A'
															: item.value >= 4.0
															? '#2CA25F'
															: item.value >= 3.5
															? '#41AE76'
															: item.value >= 3.0
															? '#7FCDBB'
															: item.value >= 2.5
															? '#C7E9B4'
															: item.value >= 2.0
															? '#EDF8B1'
															: item.value >= 1.5
															? '#FEE08B'
															: item.value >= 1.0
															? '#FDAE61'
															: '#F46D43',
												}}>
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
								{showReviews ? 'Hide' : 'Show'} Reviews ({reviews?.length})
							</button>
						</div>
						{reviewLoading ? (
							<LoadingScreen />
						) : (
							<>
								{showReviews && (
									<>
										{reviews?.length > 0 ? (
											reviews?.map((review, idx) => (
												<ReviewElement
													key={review._id ?? idx}
													user={review.user}
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
