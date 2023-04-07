import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import { MdRateReview } from 'react-icons/md'

const LecturerCard = ({ lecturer }) => {
	const {
		name,
		university: universityId,
		courses,
		ratings,
		_id: lecturerId,
	} = lecturer

	return (
		<div
			className='bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative dark:bg-gray-900'
			style={{ perspective: '800px' }}>
			<div
				className='px-6 py-4'
				style={{
					transform: 'rotateX(15deg)',
					transformOrigin: 'bottom',
				}}>
				<div
					className='flex items-center mt-8'
					style={{
						transform: 'rotateX(-15deg)',
						transformOrigin: 'top',
					}}>
					<span className='text-gray-500 mx-1'>|</span>
					<span
						className='text-teal-500 mx-1'
						style={{ transform: 'scale(1.2)' }}>
						<MdRateReview />
					</span>

					<span className='text-white text-lg'>
						{ratings.length}{' '}
						<span
							className='text-gray-500 font-light'
							style={{ transform: 'scale(0.8)' }}>
							Reviews
						</span>
					</span>
				</div>

				<div
					className='flex justify-between items-center my-5'
					style={{
						transform: 'rotateX(-15deg)',
						transformOrigin: 'top',
					}}>
					<div className='flex'>
						<span className='text-white text-lg'>
							{courses.length}{' '}
							<span
								className='text-gray-500 font-light'
								style={{ transform: 'scale(0.8)' }}>
								course(s)
							</span>
						</span>
					</div>
					<Link href={`universities/${universityId}/lecturers/${lecturerId}`}>
						<button
							className='bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-teal-600 transition-colors duration-300'
							style={{ transform: 'rotateX(15deg)' }}>
							View lecturer
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default LecturerCard
