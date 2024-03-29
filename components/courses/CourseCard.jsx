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

	const lecturerCount = lecturers?.length
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
				<div className='flex justify-between items-center px-4 py-2 md:py-4'>
					<div className='flex items-center text-gray-500'>
						<div className='flex flex-col items-center md:flex-row'>
							<IoPerson className='mr-2 lg:mr-1' />
							<div>
								<span className='mr-1'>{lecturerCount}</span>
								<span className='inline-block'> Lecturer(s)</span>
							</div>
						</div>
					</div>
					<div className='flex flex-col items-center md:flex-row'>
						<FaStar className='inline-block mr-1' />
						<span className='block lg:inline-block'>
							{ratingAvg.toFixed(1)}
						</span>
						<span className='hidden lg:inline-block'>/5.0</span>
					</div>
					<div className='flex items-center mx-2'>
						<div className='flex flex-col items-center md:flex-row'>
							<MdRateReview className='mr-2 lg:mr-1' />
							<div>
								<span className='mx-1'>{reviews?.length ?? 0}</span>
								<span className='inline-block'>Review(s)</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default CourseCard
