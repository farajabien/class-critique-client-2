import React from 'react'
import { FaClock, FaStar } from 'react-icons/fa'

function CommentElement({ student, lecturer, review, course }) {
	return (
		<>
			<div className='flex items-center mb-2'>
				<div className='w-10 h-10 rounded-full bg-gray-300 mr-4 flex-shrink-0'></div>
				<div>
					<p className='text-sm font-medium'>Jane Smith</p>
					<div className='flex items-center text-gray-500 text-sm'>
						<FaStar className='text-yellow-500 mr-1' />
						<FaStar className='text-yellow-500 mr-1' />
						<FaStar className='text-yellow-500 mr-1' />
						<FaStar className='text-gray-300 mr-1' />
						<FaStar className='text-gray-300 mr-1' />
						<span className='mr-2'>3.0</span>
						<FaClock className='mr-1' />
						<span className='mr-2'>5 hours ago</span>
					</div>
					<p className='mt-2 text-sm'>
						Proin sagittis ante sed libero rhoncus, nec interdum dolor maximus.
						Morbi rhoncus leo nisl, sed fermentum mauris cursus in. Fusce
						sagittis massa sapien, nec interdum nulla fringilla a. Sed quis urna
						dui.
					</p>
				</div>
			</div>
			<div className='flex items-center mb-2'>
				<div className='w-10 h-10 rounded-full bg-gray-300 mr-4 flex-shrink-0'></div>
				<div>
					<p className='text-sm font-medium'>Jane Smith</p>
					<div className='flex items-center text-gray-500 text-sm'>
						<FaStar className='text-yellow-500 mr-1' />
						<FaStar className='text-yellow-500 mr-1' />
						<FaStar className='text-yellow-500 mr-1' />
						<FaStar className='text-gray-300 mr-1' />
						<FaStar className='text-gray-300 mr-1' />
						<span className='mr-2'>3.0</span>
						<FaClock className='mr-1' />
						<span className='mr-2'>5 hours ago</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default CommentElement
