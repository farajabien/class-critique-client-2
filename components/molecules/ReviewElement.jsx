import React from 'react'
import moment from 'moment'
import { FaClock, FaRegStar, FaStar } from 'react-icons/fa'
import Link from 'next/link'
import Avatar from '../atoms/Avatar'
import { useSelector } from 'react-redux'
import { IoMdFemale, IoMdMale } from 'react-icons/io'
import { BsFillStarFill } from 'react-icons/bs'
import Emoji from 'react-emoji-render'

const girlEmojis = ['💅', '💄', '👗', '🎀', '💖']
const boyEmojis = ['🕶️', '💪', '🏀', '👔', '🔥']
const otherEmojis = ['🧑', '👤', '👥', '🌐', '💬']

function ReviewElement({ user, review, targetLec }) {
	// Add a check to ensure that review object is not undefined
	const { rating, comment, updatedAt: reviewUpdatedAt } = review || {}
	const {
		error,
		loading,
		user: loggedInUser,
	} = useSelector((state) => state.authReducer)
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

	const initials = user?.name
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

	// Check if the logged in user wrote this review
	let isCurrentUserReview =
		loggedInUser && loggedInUser?.id === review.user?._id

	if (loggedInUser.id == null || review.user == null) {
		isCurrentUserReview = false
	}

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
		<div>
			{isCurrentUserReview && <Badge />}
			<div
				className={`flex items-start rounded-lg shadow-md px-6 py-4 ${
					isCurrentUserReview ? 'bg-teal-100' : 'bg-white'
				}`}>
				<Avatar initials={initials} className='mr-4 mt-1' />
				<div>
					<div className='flex items-center justify-between'>
						<div>
							<div className='text-sm font-medium'>
								{user?.gender === 'male' ? (
									<BoyEmojis />
								) : user?.gender === 'female' ? (
									<GirlEmojis />
								) : (
									<OtherEmojis />
								)}
							</div>
							<div className='flex items-center text-gray-500 text-sm'>
								<FaStar
									className={`text-yellow-500 mr-1 ${
										ratingAverage >= 1 ? 'opacity-100' : 'opacity-25'
									}`}
								/>
								<FaStar
									className={`text-yellow-500 mr-1 ${
										ratingAverage >= 2 ? 'opacity-100' : 'opacity-25'
									}`}
								/>
								<FaStar
									className={`text-yellow-500 mr-1 ${
										ratingAverage >= 3 ? 'opacity-100' : 'opacity-25'
									}`}
								/>
								<FaStar
									className={`text-yellow-500 mr-1 ${
										ratingAverage >= 4 ? 'opacity-100' : 'opacity-25'
									}`}
								/>
								<FaStar
									className={`text-yellow-500 mr-1 ${
										ratingAverage >= 5 ? 'opacity-100' : 'opacity-25'
									}`}
								/>
								<span className='mr-2'>{ratingAverage.toFixed(1)}</span>
								<FaClock className='mr-1' />
								<span>{formattedDate}</span>
							</div>
						</div>
					</div>

					<div className='mt-2 text-gray-700 text-sm'>{comment}</div>
				</div>

				{targetLec && (
					<span className='inline-block ml-auto text-gray-500 text-normal'>
						<span className='ml-auto mr-1 text-normal'>Review for</span>
						<Link
							href={`/lecturers/${targetLec}`}
							className='text-teal-500 hover:underline mr-2'>
							{targetLec}
						</Link>
					</span>
				)}
			</div>
		</div>
	)
}

export default ReviewElement
