import React, { useEffect } from 'react'
import LecturerRankingCard from './LecturerRankingCard'
import LoadingScreen from '../molecules/LoadingScreen'

const Rankings = ({
	lecturers,
	reviewLoading,
	lecLoading,
	reviews,
	course,
}) => {
	const sortLecturers = (lecturers) => {
		return lecturers
		// return lecturers.sort((a, b) => b.rating - a.rating)
	}
	const sortedLecturers = sortLecturers(lecturers)

	return (
		<div>
			{lecLoading ? (
				<LoadingScreen />
			) : (
				<>
					{sortedLecturers?.map((lecturer, index) => (
						<LecturerRankingCard
							key={lecturer._id}
							lecturer={lecturer}
							rank={index + 1}
							reviews={reviews}
							reviewLoading={reviewLoading}
							course={course}
						/>
					))}
				</>
			)}
		</div>
	)
}

export default Rankings
