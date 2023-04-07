import Link from 'next/link'
import React from 'react'
import { FaGraduationCap, FaStar, FaUserFriends } from 'react-icons/fa'
import { RiArrowRightSLine } from 'react-icons/ri'

const UniversityCard = ({ uni }) => {
	return (
		<div className='bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out'>
			<div className='p-6'>
				<div className='flex justify-between items-center'>
					<h3 className='text-2xl font-bold text-teal-500'>{uni.name}</h3>
					<div className='bg-teal-500 text-white py-2 px-4 rounded-full'>
						<Link
							href={`/universities/${uni._id}`}
							className='flex items-center'>
							Visit <RiArrowRightSLine className='ml-2' />
						</Link>
					</div>
				</div>
				<div className='flex items-center mt-4'>
					<FaGraduationCap className='mr-2' />
					<p>{uni.totalStudents ?? 0} Students</p>
				</div>
				<div className='flex items-center mt-4'>
					<FaUserFriends className='mr-2' />
					<p>{uni.faculty ?? 0} Faculties</p>
				</div>
				<div className='flex items-center mt-4'>
					<FaStar className='mr-2' />
					<p>{uni.totalReviews ?? 0} Reviews</p>
				</div>
				<hr className='my-4' />
				<div className='flex justify-between items-center'>
					<p className='text-gray-700'>{uni.location}</p>
					<p className='text-gray-700'>{uni.type}</p>
				</div>
			</div>
		</div>
	)
}

export default UniversityCard
