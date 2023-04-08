import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import { MdRateReview } from 'react-icons/md'
import { IoPerson } from 'react-icons/io5'

const CourseCard = ({ course }) => {
	const {
		name,
		code,
		university: uniId,
		lecturers,
		ratings,
		_id: courseId,
	} = course

	const lecturerCount = lecturers.length
	const ratingAvg =
		ratings.reduce((acc, rating) => acc + rating.score, 0) / ratings.length

	return (
		<div className='p-4 bg-white rounded-lg shadow-md'>
			<Link
				href={`/universities/${uniId}/courses/${courseId}`}
				className='block'>
				<h3 className='text-lg font-medium'>{name}</h3>
				<p className='text-sm text-gray-500'>{code}</p>
				<div className='flex items-center mt-2'>
					<IoPerson className='text-gray-500 mr-1' />
					<span className='text-gray-500 text-sm'>
						{lecturerCount} Lecturer(s)
					</span>
				</div>
				<div className='flex items-center mt-2'>
					<FaStar className='text-yellow-500 mr-1' />
					<span className='text-gray-500 text-sm'>
						{ratingAvg.toFixed(1)} ({ratings.length} Reviews)
					</span>
				</div>
			</Link>
		</div>
	)
}

export default CourseCard
