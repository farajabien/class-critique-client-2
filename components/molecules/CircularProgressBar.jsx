import React from 'react'

function CircularProgressBar({
	percentage,
	strokeWidth = '10',
	styles = '',
	text = '',
	textStyle = '',
}) {
	const radius = 50 - strokeWidth / 2
	const circumference = 2 * Math.PI * radius
	const offset = circumference - (percentage / 100) * circumference

	return (
		<div className='relative'>
			<svg
				className={`w-16 h-16 ${styles}`}
				viewBox='0 0 100 100'
				xmlns='http://www.w3.org/2000/svg'>
				<circle
					className='text-gray-300'
					cx='50'
					cy='50'
					r={radius}
					strokeWidth={strokeWidth}
				/>
				<circle
					className='text-green-500'
					cx='50'
					cy='50'
					r={radius}
					strokeWidth={strokeWidth}
					strokeDasharray={`${circumference} ${circumference}`}
					strokeDashoffset={offset}
					transform='rotate(-90 50 50)'
				/>
			</svg>
			{text && (
				<span
					className={`absolute inset-0 flex justify-center items-center ${textStyle}`}>
					{text}
				</span>
			)}
		</div>
	)
}

export default CircularProgressBar
