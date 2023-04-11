import React from 'react'
import moment from 'moment'
import { FaClock, FaStar } from 'react-icons/fa'
import Link from 'next/link'

function ReviewElement({ username, review, targetLec }) {
	// Add a check to ensure that review object is not undefined
	const { rating, comment, date } = review || {}

	// Add a check to ensure that rating object is not undefined
	const { coolness, grading, workload, expertise, rwa } = rating || {}

	const ratingAverage = (coolness + grading + workload + expertise + rwa) / 5
	const formattedDate = moment(date).fromNow()

	return (
		<>
			<div className='flex items-center mb-2'>
				<div className='w-10 h-10 rounded-full bg-gray-300 mr-4 flex-shrink-0'></div>
				<div>
					<p className='text-sm font-medium'>
						{username}{' '}
						{targetLec && (
							<span className='inline-block ml-auto text-gray-500 text-normal'>
								<span className='ml-auto mr-2'>to</span>
								<Link
									href={`/lecturers/${targetLec}`}
									className='text-teal-500 hover:underline mr-2'>
									{targetLec}
								</Link>
							</span>
						)}
					</p>
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
					<p className='mt-2 text-sm'>{comment}</p>
				</div>
			</div>
		</>
	)
}

export default ReviewElement
