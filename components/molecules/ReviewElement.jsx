import React from 'react'
import moment from 'moment'
import { FaClock, FaStar } from 'react-icons/fa'
import Link from 'next/link'
import Avatar from '../atoms/Avatar'
import { useSelector } from 'react-redux'
import { IoMdFemale, IoMdMale } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import Emoji from 'react-emoji-render'

const girlEmojis = ['💅', '💄', '👗', '🎀', '💖']
const boyEmojis = ['🕶️', '💪', '🏀', '👔', '🔥']
const otherEmojis = ['🧑', '👤', '👥', '🌐', '💬']

function ReviewElement({ user, review, targetLec }) {
	// Add a check to ensure that review object is not undefined
	const { rating, comment, updatedAt } = review || {}
	const {
		error,
		loading,
		user: loggedInUser,
	} = useSelector((state) => state.authReducer)

	// Add a check to ensure that rating object is not undefined
	const { coolness, grading, workload, expertise, rwa } = rating || {}

	const ratingAverage = (coolness + grading + workload + expertise + rwa) / 5
	const formattedDate = moment(review?.updatedAt).fromNow()
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
	const isCurrentUserReview = loggedInUser && loggedInUser._id === user._id

	// Define the badge component
	const Badge = () => (
		<div className='inline-block ml-2 px-2 py-1 text-sm font-medium text-white bg-teal-500 rounded'>
			Your Review
		</div>
	)

	return (
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
	)
}

export default ReviewElement
