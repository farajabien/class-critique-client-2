import Link from 'next/link'
import React from 'react'
import { FaGraduationCap, FaStar, FaUserFriends } from 'react-icons/fa'
import { RiArrowRightSLine } from 'react-icons/ri'
import LoadingScreen from '../molecules/LoadingScreen'

const UniversityCard = ({ uni, loading }) => {
	return (
		<div className='bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out'>
			{loading ? (
				<LoadingScreen />
			) : (
				<Link href={`/universities/${uni._id}`}>
					<div className='p-4'>
						<div className='flex justify-between items-center'>
							<h3 className='text-lg font-bold text-teal-500'>{uni.name}</h3>
							<div className='bg-teal-500 text-white py-1 px-2 rounded-full text-sm'>
								<Link
									href={`/universities/${uni._id}`}
									className='flex items-center'>
									Visit <RiArrowRightSLine className='ml-1' />
								</Link>
							</div>
						</div>
						<div className='flex items-center mt-2'>
							<FaGraduationCap className='mr-1' />
							<p className='text-sm'>{uni.totalStudents ?? 0} Students</p>
						</div>
						<div className='flex items-center mt-2'>
							<FaUserFriends className='mr-1' />
							<p className='text-sm'>{uni.faculty ?? 0} Faculties</p>
						</div>
						<div className='flex items-center mt-2'>
							<FaStar className='mr-1' />
							<p className='text-sm'>{uni.totalReviews ?? 0} Reviews</p>
						</div>
						<hr className='my-2' />
						<div className='flex justify-between items-center'>
							<p className='text-gray-700 text-sm'>{uni.location}</p>
							<p className='text-gray-700 text-sm'>{uni.type}</p>
						</div>
					</div>
				</Link>
			)}
		</div>
	)
}

export default UniversityCard
