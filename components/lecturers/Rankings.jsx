import React from 'react'
import LecturerRankingCard from './LecturerRankingCard'
import LoadingScreen from '../molecules/LoadingScreen'

const Rankings = ({ lecturers, loading }) => {
	// Your code here
	const sortLecturers = (lecturers) => {
		return lecturers.sort((a, b) => b.rating - a.rating)
	}
	const sortedLecturers = sortLecturers(lecturers)

	return (
		<div>
			{loading ? (
				<LoadingScreen />
			) : (
				<>
					{sortedLecturers.map((lecturer, index) => (
						<LecturerRankingCard
							key={lecturer.id}
							lecturer={lecturer}
							rank={index + 1}
						/>
					))}
				</>
			)}
		</div>
	)
}

export default Rankings
