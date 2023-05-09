import { motion } from 'framer-motion'
import {
	FaSearch,
	FaStar,
	FaBook,
	FaChalkboardTeacher,
	FaComments,
} from 'react-icons/fa'
import Avatar from 'react-avatar'
import Link from 'next/link'
import { MdRateReview } from 'react-icons/md'

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

const avatarVariants = {
	hidden: { scale: 0 },
	visible: {
		scale: 1,
		transition: {
			delay: 0.2,
		},
	},
}

const progressBarVariants = {
	hidden: {
		opacity: 0,
		x: -100,
	},
	visible: (custom) => ({
		opacity: 1,
		x: custom,
		transition: {
			duration: 1.5,
			ease: 'easeInOut',
		},
	}),
}

const UniversityCard = ({ uni, index, percentage }) => {
	return (
		<Link href={`/universities/${uni._id}`} className='w-full' key={uni._id}>
			<motion.div
				custom={index}
				variants={cardVariants}
				initial='hidden'
				animate='visible'
				// design it so that content doesnt hide even if it is alot
				className='bg-white rounded-md shadow-md overflow-hidden mb-4'>
				<div className='p-4 flex justify-between items-center'>
					<div className='flex items-center'>
						<Avatar
							name={uni.name}
							size={50}
							round={true}
							variant='circle'
							className='mr-4'
							variants={avatarVariants}
							initial='hidden'
							animate='visible'
						/>
						<div>
							<h2 className='text-lg font-medium'>{uni.name}</h2>
							<div className='flex items-center text-gray-500'>
								<FaSearch className='mr-1' />
								<span>{uni.location}</span>
							</div>
						</div>
					</div>
				</div>

				<div>
					<motion.div
						className='bg-gray-200 rounded-md h-4'
						initial='hidden'
						animate='visible'
						custom={percentage}
						variants={progressBarVariants}>
						<motion.div
							className='bg-teal-400 h-4 rounded-md'
							style={{ width: `${percentage}%` }}></motion.div>
					</motion.div>
					<div className='flex justify-between items-center p-4'>
						<div className='flex items-center text-gray-500'>
							<FaBook className='mr-2' />
							<span>{uni.courses?.length ?? 0} Course(s)</span>
						</div>
						<div className='flex items-center'>
							<FaChalkboardTeacher className='mr-2' />
							<span>{uni.lecturers?.length ?? 0} Lecturer(s)</span>
						</div>
						<div className='flex items-center'>
							<MdRateReview className='mr-2 lg:mr-1' />
							<span>{uni.reviews?.length ?? 0} Review(s)</span>
						</div>
					</div>
				</div>
			</motion.div>
		</Link>
	)
}

export default UniversityCard
