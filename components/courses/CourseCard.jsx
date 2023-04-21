import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import { MdRateReview } from 'react-icons/md'
import { IoPerson } from 'react-icons/io5'
import { IoSchool } from 'react-icons/io5'
import Avatar from 'react-avatar'
import { motion } from 'framer-motion'

const cardVariants = {
	hidden: (custom) => ({
		opacity: 0,
		y: custom * 20,
	}),
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.1,
		},
	},
}

const CourseCard = ({ course }) => {
	const {
		name,
		code,
		university: uniId,
		lecturers,
		reviews,
		_id: courseId,
		avgCoolness,
		avgExpertise,
		avgGrading,
		avgRWA,
		avgWorkload,
	} = course

	const lecturerCount = lecturers.length
	const ratingAvg =
		(avgCoolness + avgExpertise + avgGrading + avgRWA + avgWorkload) / 5

	return (
		<motion.div
			custom={courseId}
			variants={cardVariants}
			initial='hidden'
			animate='visible'
			className='bg-white shadow-md rounded-md flex flex-col justify-between h-36'>
			<div className='p-4 flex justify-between items-center'>
				<div className='flex items-center'>
					<Avatar
						name={name}
						size={50}
						round={true}
						variant='circle'
						className='mr-4'
					/>
					<div>
						<h2 className='text-lg font-medium'>{name}</h2>
						<div className='flex items-center text-gray-500'>
							<span>{code}</span>
						</div>
					</div>
				</div>
				<div className='flex items-center text-gray-500'>
					<IoSchool className='mr-2' />
					<span>{course.code}</span>
				</div>
			</div>

			<div>
				<div className='flex justify-between items-center p-4'>
					<div className='flex items-center text-gray-500'>
						<IoPerson className='mr-2' />
						<span>{lecturerCount} Lecturer(s)</span>
					</div>
					<div className='flex items-center'>
						<FaStar className='mr-2' />
						<span>{ratingAvg.toFixed(1)}/5.0</span>
					</div>
					<div className='flex items-center'>
						<MdRateReview className='mr-2' />
						<span>{reviews?.length ?? 0} Review(s)</span>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default CourseCard
