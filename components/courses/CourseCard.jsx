import Link from 'next/link'
import React from 'react'
import { FaChalkboardTeacher, FaStar } from 'react-icons/fa'
import { MdRateReview } from 'react-icons/md'
import { IoSchoolOutline } from 'react-icons/io5'
import { FiUsers } from 'react-icons/fi'

const CourseCard = ({ course }) => {
	const {
		name,
		code,
		university: universityId,
		lecturers,
		ratings,
		_id: courseId,
	} = course

	return (
		<Link href={`/universities/${universityId}/courses/${courseId}`}>
			<div className='rounded-xl shadow-md flex flex-col justify-between p-6 mb-5 mx-2 bg-gray-50 transition-colors cursor-pointer hover:shadow-lg'>
				<p className='text-gray-500 text-sm font-bold text-right'>{code}</p>
				<div>
					<div className='text-teal-500 text-4xl mb-4'>
						<IoSchoolOutline />
					</div>
					<h2 className='text-2xl font-bold mb-2 text-gray-800'>{name}</h2>
					<p className='text-gray-500 text-base mb-4'></p>
				</div>
				<div className='flex items-center'>
					<div className='text-gray-500 text-sm mr-1'>
						<FaChalkboardTeacher />
					</div>
					<p className='text-gray-500 text-sm'>
						{lecturers && lecturers.length > 0
							? `${lecturers.length} instructor(s) listed.`
							: 'No instructor listed.'}
					</p>
				</div>

				<div className='flex justify-between mt-4'>
					<div className='flex items-center'>
						<div className='text-teal-500 text-xl mr-1'>
							<FaStar />
						</div>
						<p className='text-gray-500 font-bold text-normal'>
							{ratings && ratings.length > 0
								? `${
										ratings.reduce(
											(total, rating) => total + rating.rating,
											0
										) / ratings.length
								  }`
								: 'No ratings yet'}
						</p>
					</div>
					<div className='flex items-center'>
						<div className='text-teal-500 text-xl mr-1'>
							<MdRateReview />
						</div>
						<p className='text-gray-500 font-bold text-normal'>
							{ratings && ratings.length > 0
								? `${ratings.length} ${
										ratings.length === 1 ? 'review' : 'reviews'
								  }`
								: 'No reviews yet'}
						</p>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default CourseCard
