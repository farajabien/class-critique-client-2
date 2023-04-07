import React from 'react'
import LecturerCard from './LecturerCard'

const LecturerList = ({ lecturers }) => {
	return (
		<div className='bg-gray-100'>
			<h2 className='text-3xl font-bold mb-8 text-teal-600'>lecturers</h2>
			{lecturers.length === 0 ? (
				<p className='text-lg text-center'>No lecturers found.</p>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 px-4'>
					{lecturers.map((lecturer) => (
						<LecturerCard key={lecturer._id} lecturer={lecturer} />
					))}
				</div>
			)}
		</div>
	)
}

export default LecturerList
