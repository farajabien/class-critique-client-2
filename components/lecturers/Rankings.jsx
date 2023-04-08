import React from 'react'
import LecturerRankingCard from './LecturerRankingCard'

const Rankings = ({ lecturers }) => {
	// Your code here
	const sortLecturers = (lecturers) => {
		return lecturers.sort((a, b) => b.rating - a.rating)
	}
	const sortedLecturers = sortLecturers(lecturers)

	return (
		<div>
			{sortedLecturers.map((lecturer, index) => (
				<LecturerRankingCard
					key={lecturer.id}
					lecturer={lecturer}
					rank={index + 1}
				/>
			))}
		</div>
	)
}

export default Rankings
