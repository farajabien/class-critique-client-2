import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUniversities } from '../../actions/uniActions'
import LoadingScreen from '../../components/molecules/LoadingScreen'

export default function UniversitiesPage() {
	const dispatch = useDispatch()
	const universities = useSelector((state) => state.uniReducer.unis)
	const loading = useSelector((state) => state.uniReducer.loading)
	const error = useSelector((state) => state.uniReducer.error)

	useEffect(() => {
		dispatch(getUniversities())
	}, [dispatch])

	if (error) {
		return <div className='m-5'>{error}</div>
	}

	return (
		<div className='m-5'>
			{loading ? (
				<LoadingScreen />
			) : (
				<>
					{universities.map((uni, idx) => (
						<div
							key={uni._id}
							className='bg-teal-300 p-5 m-2 cursor-pointer hover:bg-teal-600'>
							# {idx + 1}
							<h1>{uni.name}</h1>
							<p>{uni.location}</p>
						</div>
					))}
				</>
			)}
		</div>
	)
}
