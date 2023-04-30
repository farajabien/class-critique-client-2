import React, { useEffect } from 'react'
import LecturerRankingCard from './LecturerRankingCard'
import LoadingScreen from '../molecules/LoadingScreen'

const Rankings = ({
	sortedLecturers,
	reviewLoading,
	lecLoading,
	reviews,
	course,
	userData,
	openLecModalFromReview,
	setOpenLecModalFromReview,
}) => {
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
