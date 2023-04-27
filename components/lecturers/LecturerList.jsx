// LecturerList.js
import React from 'react'
import LecturerCard from './LecturerCard'

export default function LecturerList({ lecturers, loading, error }) {
	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	if (lecturers.length === 0) {
		return <div>No lecturers found.</div>
	}

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
			{lecturers.map((lecturer) => (
				<LecturerCard key={lecturer._id} lecturer={lecturer} />
			))}
		</div>
	)
}
