import React, { useEffect } from 'react'
import LecturerRankingCard from './LecturerRankingCard'
import LoadingScreen from '../molecules/LoadingScreen'

const Rankings = ({ lecturers, loading, reviews, course }) => {
	const sortLecturers = (lecturers) => {
		return lecturers
		// return lecturers.sort((a, b) => b.rating - a.rating)
	}
	const sortedLecturers = sortLecturers(lecturers)

	return (
		<div>
			{loading ? (
				<LoadingScreen />
			) : (
				<>
					{sortedLecturers?.map((lecturer, index) => (
						<LecturerRankingCard
							key={lecturer._id}
							lecturer={lecturer}
							rank={index + 1}
							reviews={reviews}
							loading={loading}
							course={course}
						/>
					))}
				</>
			)}
		</div>
	)
}

export default Rankings
