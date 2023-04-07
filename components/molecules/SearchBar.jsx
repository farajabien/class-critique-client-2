import React from 'react'

const SearchBar = ({
	placeholder,
	searchIcon,
	onClick,
	onChange,
	className,
}) => {
	const handleInputChange = (event) => {
		onChange(event.target.value)
	}

	return (
		<div className={`relative ${className}`}>
			<button className='absolute right-0 top-0 h-full w-14 text-teal-600 rounded-full bg-gray-50 focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg hover:bg-teal-600 hover:text-white focus:bg-teal-600 focus:text-white'>
				{searchIcon}
			</button>

			<input
				type='text'
				className='bg-white rounded-full w-full py-2 px-4 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent'
				placeholder={placeholder}
				onChange={handleInputChange}
			/>
		</div>
	)
}

export default SearchBar
