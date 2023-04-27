import React from 'react'
import { FaStar } from 'react-icons/fa'

function StarRating({ value, setValue }) {
	const stars = [1, 2, 3, 4, 5]

	return (
		<div className='flex items-center'>
			{stars.map((star) => (
				<FaStar
					key={star}
					size={24}
					className={`cursor-pointer ${
						value >= star ? 'text-yellow-500' : 'text-gray-400'
					}`}
					onClick={() => setValue(star)}
				/>
			))}
		</div>
	)
}

export default StarRating
