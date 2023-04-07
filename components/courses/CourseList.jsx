import React from 'react'
import CourseCard from './CourseCard'

const CourseList = ({ courses }) => {
	return (
		<div className='bg-gray-100'>
			<h2 className='text-3xl font-bold my-4 text-teal-600'>
				Courses ({courses.length})
			</h2>
			{courses.length === 0 ? (
				<p className='text-lg text-center'>No courses found.</p>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 px-4'>
					{courses.map((course) => (
						<CourseCard key={course._id} course={course} />
					))}
				</div>
			)}
		</div>
	)
}

export default CourseList
