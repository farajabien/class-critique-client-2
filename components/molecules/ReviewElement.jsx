import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FaClock, FaStar } from 'react-icons/fa'
import Link from 'next/link'
import Avatar from '../atoms/Avatar'
import { BsFillStarFill } from 'react-icons/bs'
import { useUser } from '@clerk/nextjs'
import LecturerModalFromReview from '../lecturers/LecturerModalFromReview'

const girlEmojis = ['💅', '💄', '👗', '🎀', '💖']
const boyEmojis = ['🕶️', '💪', '🏀', '👔', '🔥']
const otherEmojis = ['🧑', '👤', '👥', '🌐', '💬']

function ReviewElement({
	loggedInUserData,
	reviews,
	review,
	sortedLecturers,
	course,
	userData,
}) {
	// Add a check to ensure that review object is not undefined
	const { rating, comment, updatedAt: reviewUpdatedAt } = review || {}
	const [lecturer, setLecturer] = useState({})

	const { user: loggedInUser, isLoading } = useUser()
	const [showModal, setShowModal] = useState(false)

	const handleModal = () => {
		setShowModal(!showModal)
	}

	const [isCurrentUserReview, setIsCurrentUserReview] = useState(false)
	// Check if the logged in user wrote this review
	useEffect(() => {
		if (loggedInUserData?._id == review.user._id) {
			setIsCurrentUserReview(true)
		}
	}, [loggedInUserData, review])

	const getLec = () => {
		const lec = sortedLecturers.find((lec) => lec._id === review.lecturer)

		setLecturer(lec)
	}

	useEffect(() => {
		if (sortedLecturers) {
			getLec()
		}
	}, [sortedLecturers])

	if (!review) return null

	// Add a check to ensure that rating object is not undefined
	const {
		coolness,
		grading,
		workload,
		expertise,
		rwa,
		updatedAt: ratingUpdatedAt,
	} = rating || {}

	const ratingAverage = (coolness + grading + workload + expertise + rwa) / 5

	const latestUpdate =
		reviewUpdatedAt > ratingUpdatedAt ? reviewUpdatedAt : ratingUpdatedAt

	const formattedDate = moment(latestUpdate).fromNow()

	const initials = loggedInUser?.fullName
		.split(' ')
		.map((part) => part[0])
		.join('.')

	const GirlEmojis = () => (
		<div className='flex'>
			{girlEmojis.map((emoji) => (
				<span key={emoji} className='mr-1'>
					{emoji}
				</span>
			))}
		</div>
	)

	const BoyEmojis = () => (
		<div className='flex'>
			{boyEmojis.map((emoji) => (
				<span key={emoji} className='mr-1'>
					{emoji}
				</span>
			))}
		</div>
	)

	const OtherEmojis = () => (
		<div className='flex'>
			{otherEmojis.map((emoji) => (
				<span key={emoji} className='mr-1'>
					{emoji}
				</span>
			))}
		</div>
	)

	// Define the badge component
	const Badge = () => (
		<div className='absolute'>
			<div className='text-xl font-medium text-yellow-400 rounded-full mt-1 ml-1'>
				{/* star icon  */}
				<BsFillStarFill className='mr-1' />
			</div>
		</div>
	)

	return (
		<div className='w-full'>
			{isCurrentUserReview && <Badge />}
			<div
				className={`flex items-start px-6 py-4 ${
					isCurrentUserReview ? 'bg-teal-100' : 'bg-white'
				}`}>
				{/* <Avatar initials={initials} className='mr-4 mt-1' /> */}
				<div>
					<div className='flex items-center justify-between'>
						<div>
							<div className='text-sm font-medium flex items-center'>
								{loggedInUserData?.gender === 'Male' ? (
									<>
										<span role='img' aria-label='Male'>
											👨
										</span>
										<span className='ml-1 mr-2'>{userData.name}</span>
										{/* Render the lecturer information */}
										{lecturer && (
											<span className='inline-block ml-auto text-gray-500 text-normal'>
												<span className='ml-auto mr-1 text-normal'>For</span>
												<span
													onClick={handleModal}
													className='text-teal-500 hover:underline mr-2 cursor-pointer'>
													{`${lecturer.name}`}
												</span>
											</span>
										)}
									</>
								) : loggedInUserData?.gender === 'Female' ? (
									<>
										<span role='img' aria-label='Female'>
											👩
										</span>
										<span className='ml-1 mr-2'>{userData.name}</span>
									</>
								) : (
									<>
										<span role='img' aria-label='Other'>
											🧑‍🤝‍🧑
										</span>
										<span className='ml-1 mr-2'>{userData.name}</span>
									</>
								)}
							</div>
							<div className='flex items-center text-gray-500 text-sm'>
								{[1, 2, 3, 4, 5].map((star) => (
									<FaStar
										key={star}
										className={`text-yellow-500 mr-1 ${
											ratingAverage >= star ? 'opacity-100' : 'opacity-25'
										}`}
									/>
								))}
								<span className='mr-2'>{ratingAverage.toFixed(1)}</span>
								<FaClock className='mr-1' />
								<span>{formattedDate}</span>
							</div>
						</div>
					</div>
					<div className='mt-2 text-gray-700 text-sm'>{comment}</div>
				</div>
			</div>

			{/* Render the lecturer modal */}
			{showModal && (
				<LecturerModalFromReview
					className='fixed top-0 left-0 w-full h-full'
					lecturer={lecturer}
					rank={
						sortedLecturers.findIndex(
							(lecturer) => lecturer._id === lecturer._id
						) + 1
					}
					handleCloseModal={() => setShowModal(false)}
					handleCloseReviewModal={() => setShowModal(false)}
					reviews={reviews}
					course={course}
					reviewLoading={false}
					userData={userData}
				/>
			)}
		</div>
	)
}

export default ReviewElement
