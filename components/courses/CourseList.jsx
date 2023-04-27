import React from 'react'
import CourseCard from './CourseCard'
import LoadingScreen from '../molecules/LoadingScreen'
import Link from 'next/link'

export default function CourseList({ courses, loading, uniId }) {
	const handleCourseCardClick = (course) => {
		// add your code here
	}

	return (
		<div className='bg-white p-4 sm:p-6 lg:p-8'>
			{loading && (
				<div className='flex items-center justify-center h-screen'>
					<LoadingScreen />
				</div>
			)}
			{!loading && (
				<div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
					{courses.map((course) => (
						<Link
							key={course._id}
							href={`/universities/${uniId}/courses/${course._id}`}>
							<CourseCard
								key={course._id}
								course={course}
								onClick={() => handleCourseCardClick(course)}
							/>
						</Link>
					))}
				</div>
			)}
		</div>
	)
}
