import React from 'react'
import { random } from 'lodash'
import clsx from 'clsx'

function Avatar({ initials }) {
	const colors = [
		'bg-teal-800',
		'bg-teal-800',
		'bg-teal-800',
		'bg-teal-800',
		'bg-teal-800',
		'bg-teal-800',
		'bg-teal-800',
		'bg-teal-800',
		'bg-teal-800',
	]
	const randomColor = colors[random(0, colors.length - 1)]
	const avatarClasses = clsx(
		'w-10 h-10 rounded-full flex items-center justify-center mr-3',
		randomColor
	)

	return (
		<div className={avatarClasses}>
			<span className='text-white font-medium text-lg'>{initials}</span>
		</div>
	)
}

export default Avatar
