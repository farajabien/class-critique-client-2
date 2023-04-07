import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { FaUniversity } from 'react-icons/fa'
import { getUniversity } from '../../actions/uniActions'

export default function UniversityInfo({ uniId }) {
	const dispatch = useDispatch()
	const uni = useSelector((state) => state.uniReducer.selectedUni)
	const loading = useSelector((state) => state.uniReducer.loading)

	//useffect get uni
	useEffect(() => {
		if (uniId) {
			dispatch(getUniversity(uniId))
		}
	}, [dispatch, uniId])

	if (loading) {
		return <p>Loading...</p>
	}

	return (
		<div className='bg-gray-100 p-8 rounded-lg shadow-md'>
			{uni && (
				<>
					{' '}
					<div className='flex items-center mb-8'>
						<FaUniversity className='text-teal-500 text-3xl mr-2' />
						<h2 className='text-2xl font-bold text-gray-800'>{uni.name}</h2>
					</div>
					<div className='flex flex-col space-y-4'>
						<div>
							<h3 className='text-lg font-semibold text-gray-800 mb-2'>
								Location
							</h3>
							<p className='text-gray-700'>{uni.location}</p>
						</div>
						<div>
							<h3 className='text-lg font-semibold text-gray-800 mb-2'>
								Description
							</h3>
							<p className='text-gray-700'>{uni.description}</p>
						</div>
						<div>
							<h3 className='text-lg font-semibold text-gray-800 mb-2'>
								Contact
							</h3>
							<p className='text-gray-700'>{uni.contact ?? '07XX-XXX-XXX'}</p>
						</div>
					</div>
				</>
			)}
		</div>
	)
}
