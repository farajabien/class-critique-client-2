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
import { FiUsers } from 'react-icons/fi'

function CourseSummary({
	course,
	sortedLecturers,
	handleCloseModal,
	courseLoading,
	reviews,
	reviewLoading,
	userData,
}) {
	//function to get lec from sortedLecturers array by lecid and return name
	const getLec = (lecId) => {
		const lec = sortedLecturers?.find((lec) => lec._id === lecId)
		return lec
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

	const numReviews = reviews.length

	const progressBarColor = '#26A69A'

	return (
		<div className='bg-white rounded-lg max-w-3xl w-full overflow-hidden px-2'>
			{courseLoading ? (
				<LoadingScreen />
			) : (
				<>
					<div className='px-6 py-2 flex justify-between items-center mb-2'>
						<h2 className='text-2xl font-medium text-gray-700'>
							{course?.code} SUMMARY
						</h2>
					</div>
					<div className='px-6 py-2 grid grid-cols-1 gap-6 md:grid-cols-2'>
						<div className='grid grid-cols-2 gap-6'>
							<div>
								<div className='w-64 md:w-48 h-64 md:h-48 mx-auto relative'>
									<CircularProgressbar
										value={totalAvg * 20}
										text={`${totalAvg.toFixed(1)}`}
										strokeWidth={10}
										styles={{
											root: {
												width: '100%',
												height: '100%',
											},
											path: {
												stroke: `${progressBarColor}`,
												strokeLinecap: 'round',
											},
											text: {
												fill: `${progressBarColor}`,
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

									<div className='absolute top-8 left-0 w-full h-full flex items-center justify-center'>
										<div className='flex items-center'>
											<div className='text-teal-500 text-lg mr-2'>
												<FiUsers className='inline-block mr-1 mb-1' />
												{numReviews}
												<span className='text-gray-500 ml-1'>reviews</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
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
												className='w-12 h-12 md:w-8 md:h-8 flex items-center justify-center rounded-full mr-3'
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
												<span className='text-white text-lg font-semibold'>
													{item.label.charAt(0)}
												</span>
											</div>
											<h4 className='text-gray-700 font-medium'>
												{item.label}
											</h4>
										</div>
										<div className='text-gray-700 font-semibold'>
											{item.value.toFixed(2)}
											{item.units && (
												<span className='text-gray-500 ml-1'>{item.units}</span>
											)}
										</div>
									</div>
									{showDescription === item.label && (
										<div className='mt-2 text-gray-600 text-sm'>
											{item.description}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
					{/* REVIEWS */}
					<div className='mt-4 px-2'>
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
													loggedInUserData={userData}
													reviews={reviews}
													review={review}
													course={course}
													sortedLecturers={sortedLecturers}
													userData={userData}
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
