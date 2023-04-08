import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import { MdRateReview } from 'react-icons/md'

const LecturerCard = ({ lecturer }) => {
	const { name, university, courses, ratings, _id: lecturerId } = lecturer

	const avgRating =
		ratings.reduce((total, rating) => total + rating.score, 0) / ratings.length

	return (
		<Link href={`/lecturers/${lecturerId}`}>
			<div className='bg-white shadow-md rounded-md cursor-pointer'>
				<div className='px-4 py-3'>
					<h3 className='text-lg font-medium'>{name}</h3>
					<p className='text-gray-600'>{university.name}</p>
					<div className='flex items-center mt-2'>
						<FaStar className='text-yellow-400 mr-1' />
						<span className='text-gray-600'>{avgRating.toFixed(1)}</span>
						<span className='text-gray-500 text-sm ml-1'>
							({ratings.length} ratings)
						</span>
					</div>
					<div className='flex items-center mt-2'>
						<MdRateReview className='text-gray-500 mr-1' />
						<span className='text-gray-600'>{courses.length} courses</span>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default LecturerCard
