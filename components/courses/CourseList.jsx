// CourseList.js
import React from 'react'
import CourseCard from './CourseCard'

export default function CourseList({ courses, loading, error }) {
	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	if (courses.length === 0) {
		return <div>No courses found.</div>
	}

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
			{courses.map((course) => (
				<CourseCard key={course.id} course={course} />
			))}
		</div>
	)
}
