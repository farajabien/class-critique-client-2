import Image from 'next/image'
import Link from 'next/link'
import { FaFileAlt } from 'react-icons/fa'
import LoadingScreen from '../../../../../../components/molecules/LoadingScreen'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MdRateReview } from 'react-icons/md'
import { getReviewsForCourse } from '../../../../../../actions/reviewActions'

function PastPapersPage() {
	const router = useRouter()
	const [searchQuery, setSearchQuery] = useState('')
	const dispatch = useDispatch()
	const course = useSelector((state) => state.courseReducer.selectedUniCourse)
	const university = useSelector((state) => state.uniReducer.selectedUni)
	const lecturers = useSelector(
		(state) => state.lecturerReducer.courseLecturers
	)

	const courseLoading = useSelector((state) => state.courseReducer.loading)
	const lecLoading = useSelector((state) => state.lecturerReducer.loading)
	const error = useSelector((state) => state.courseReducer.error)

	return (
		<div className='bg-gray-100 min-h-screen mx-3'>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 1 }}
				className='bg-white py-2'>
				{courseLoading ? (
					<LoadingScreen />
				) : (
					<div className='mx-auto px-4'>
						<div className='flex justify-between items-center'>
							<div className='flex items-center space-x-4'>
								<div>
									<h1 className='text-4xl font-bold text-gray-800'>
										{course?.name}
									</h1>
									<Link href={`/universities/${university?._id}`}>
										<p className='text-sm font-medium text-gray-500'>
											{university?.name?.toUpperCase() ?? ''}
										</p>
									</Link>

									<div className='flex items-center '>
										<p className='text-sm font-medium text-teal-500'>
											{course?.code}
										</p>
										<span className='text-sm font-medium text-gray-500'>
											Average rating:
										</span>
										<div className='flex items-center space-x-1'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-4 w-4 text-teal-500'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M17.156,8.988l1.844-.283a1.162,1.162,0,0,1,1.355,1.355l-.283,1.844a1.162,1.162,0,0,1-1.1.941l-1.912.285-.862,1.746a1.162,1.162,0,0,1-2.077,0l-.862-1.746-1.912-.285a1.162,1.162,0,0,1-1.1-.941l-.283-1.844a1.162,1.162,0,0,1,1.355-1.355l1.844.283.862-1.746a1.162,1.162,0,0,1,2.077,0l.862,1.746,1.912.285A1.162,1.162,0,0,1,17.156,8.988ZM10,13.347a3.347,3.347,0,1,0-3.347-3.347A3.347,3.347,0,0,0,10,13.347Z'
												/>
											</svg>
											<span className='text-sm font-medium text-gray-500'>
												{course?.average_rating?.toFixed(1) ?? 0.0}
											</span>
										</div>
									</div>
								</div>
							</div>

							<Link
								href={`/universities/${course?.university}/courses/${course?._id}`}>
								<div className='relative flex items-center space-x-2 py-2 px-3 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition duration-200'>
									<MdRateReview className='mr-2 lg:mr-1 text-lg' />
									<span className='text-sm font-medium'>Course reviews</span>
									<span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full'>
										{course.reviews?.length ?? 0}
									</span>
								</div>
							</Link>
						</div>
					</div>
				)}
			</motion.div>
			<div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
				<div className='text-3xl font-bold mb-4'>Coming Soon</div>
				<div className='text-lg mt-4'>
					We are currently working on bringing you the past papers. Stay tuned!
				</div>
			</div>
		</div>
	)
}

export default PastPapersPage
