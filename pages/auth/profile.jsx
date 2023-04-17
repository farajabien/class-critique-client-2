import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaStar } from 'react-icons/fa'

const StudentProfile = () => {
	const dispatch = useDispatch()
	const { error, loading, user } = useSelector((state) => state.authReducer)

	const renderStudentDetails = () => {
		return (
			<div className='bg-white shadow-lg rounded-lg overflow-hidden'>
				{user && (
					<>
						{' '}
						<div className='px-6 py-4'>
							<h2 className='text-2xl font-bold mb-2'>{user.name}</h2>
							<p className='text-gray-600'>{user.email}</p>
							<p className='text-gray-600'>
								Joined: {new Date(user.createdAt).toLocaleDateString()}
							</p>
						</div>
						<div className='border-t border-gray-200 px-6 py-4'>
							<p className='text-gray-600'>Student ID: {user.id}</p>
							<p className='text-gray-600'>Level: {user.level}</p>
							<p className='text-gray-600'>Major: {user.major}</p>
						</div>
					</>
				)}
			</div>
		)
	}

	const renderFavoriteLecturers = () => {
		return (
			<div className='mt-6'>
				<h2 className='text-2xl font-bold mb-4'>Favorite Lecturers</h2>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
					<div className='bg-white shadow-lg rounded-lg overflow-hidden'>
						<div className='px-6 py-4'>
							<h3 className='text-xl font-bold mb-2'>Dr. John Doe</h3>
							<p className='text-gray-600'>Computer Science</p>
						</div>
						<div className='px-6 py-4 flex items-center'>
							<FaStar className='text-yellow-400 mr-2' />
							<p className='text-gray-600 font-bold'>4.5</p>
						</div>
					</div>

					{/* More favorite lecturers here */}
				</div>
			</div>
		)
	}

	return (
		<div className='bg-gray-100 min-h-screen'>
			<div className='mx-auto container py-6'>
				{renderStudentDetails()}
				{renderFavoriteLecturers()}
			</div>
		</div>
	)
}

export default StudentProfile
