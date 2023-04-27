import Link from 'next/link'
import React, { useEffect } from 'react'
import { MdRateReview } from 'react-icons/md'

const LecturerCard = ({ lecturer }) => {
	// 	name,
	// 	university: universityId,
	// 	courses,
	// 	ratings, (their ratings for that specific course)
	// 	_id: lecturerId,

	return (
		<Link
			href={`/lecturers/${lecturer._id}`}
			className='block bg-white rounded-md shadow-md px-6 py-4 transition duration-300 hover:shadow-lg'>
			<h3 className='text-lg font-medium'>{lecturer.name}</h3>
			<div className='mt-4 flex items-center'>
				<span className='text-gray-500 mr-2'>
					<MdRateReview />
				</span>
				<span className='text-gray-700 font-medium'>
					{lecturer.ratings?.length || 'No'} ratings
				</span>
			</div>
		</Link>
	)
}

export default LecturerCard
