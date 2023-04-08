import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { FaLocationArrow, FaUniversity } from 'react-icons/fa'
import { getUniversity } from '../../actions/uniActions'
import LoadingScreen from '../molecules/LoadingScreen'

export default function UniversityInfo({ uniId }) {
	const dispatch = useDispatch()
	const uni = useSelector((state) => state.uniReducer.selectedUni)
	const loading = useSelector((state) => state.uniReducer.loading)

	useEffect(() => {
		if (uniId) {
			dispatch(getUniversity(uniId))
		}
	}, [dispatch, uniId])

	return (
		<div className='bg-gray-100 p-8 rounded-lg shadow-md'>
			{loading && <LoadingScreen />}
			{!loading && uni && (
				<>
					{' '}
					<div className='flex items-center mb-8'>
						<FaUniversity className='text-teal-500 text-3xl mr-2' />
						<h2 className='text-2xl font-bold text-gray-800'>{uni.name}</h2>
					</div>
					<div className='flex flex-col space-y-4'>
						<div>
							<p className='text-gray-700'>
								<FaLocationArrow className='text-teal-500 text-normal mr-2 inline-block' />
								{uni.location}
							</p>
						</div>
					</div>
				</>
			)}
		</div>
	)
}
