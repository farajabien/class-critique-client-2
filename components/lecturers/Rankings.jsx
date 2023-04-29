import React, { useEffect } from 'react'
import LecturerRankingCard from './LecturerRankingCard'
import LoadingScreen from '../molecules/LoadingScreen'

const Rankings = ({
	lecturers,
	reviewLoading,
	lecLoading,
	reviews,
	course,
	userData,
}) => {
	const sortLecturers = (lecturers) => {
		const lecturersWithAvgRating = lecturers.map((lecturer) => {
			// Calculate the average rating for this lecturer

			const totalRating =
				lecturer.avgCoolness +
				lecturer.avgGrading +
				lecturer.avgWorkload +
				lecturer.avgExpertise +
				lecturer.avgRWA
			const avgRating = totalRating / 5

			// Add the average rating to the lecturer object
			return { ...lecturer, avgRating }
		})

		// Sort the lecturers by their average rating in descending order
		const sortedLecturers = lecturersWithAvgRating.sort(
			(a, b) => b.avgRating - a.avgRating
		)

		return sortedLecturers
	}

	const sortedLecturers = sortLecturers(lecturers)

	return (
		<div>
			{sortedLecturers?.map((lecturer, index) => (
				<LecturerRankingCard
					key={lecturer._id}
					lecturer={lecturer}
					rank={index + 1}
					reviews={reviews}
					reviewLoading={reviewLoading}
					course={course}
					userData={userData}
				/>
			))}
		</div>
	)
}

export default Rankings
