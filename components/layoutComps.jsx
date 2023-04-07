import { useState } from 'react'
import Link from 'next/link'
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { FaBars, FaTimes } from 'react-icons/fa'

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<header className='bg-gray-100 flex justify-between items-center py-4 px-6 md:px-12 lg:px-16'>
			<div className='flex items-center space-x-4'>
				<Link
					href='/'
					className='flex items-center space-x-2 font-bold text-lg md:text-xl'>
					<span>ClassCritique</span>
				</Link>
			</div>

			<button
				className='md:hidden text-2xl focus:outline-none'
				onClick={toggleMenu}
				aria-label='Toggle menu'>
				{isOpen ? <FaTimes /> : <FaBars />}
			</button>

			<nav
				className={`md:flex md:items-center space-x-4 ${
					isOpen ? 'block' : 'hidden'
				}`}>
				<Link
					href='/universities'
					className='flex items-center space-x-1 text-base md:text-lg hover:text-teal-400 focus:text-teal-400'>
					<span>Universities</span>
				</Link>

				<Link
					href='/auth/login'
					className='flex items-center space-x-1 bg-teal-400 text-white px-3 py-2 rounded-full text-base md:text-lg hover:bg-teal-500 focus:bg-teal-500 transition-colors duration-300'>
					<AiOutlineUserAdd />
					<span>Sign In</span>
				</Link>

				<Link
					href='/profile'
					className='flex items-center space-x-1 text-base md:text-lg hover:text-teal-400 focus:text-teal-400'>
					<HiOutlineUserCircle />
					<span>Profile</span>
				</Link>
			</nav>
		</header>
	)
}

import { FaGithub, FaTwitter } from 'react-icons/fa'

const Footer = () => {
	return (
		<footer className='bg-gray-800 py-4'>
			<div className='container mx-auto px-4'>
				<div className='flex justify-center items-center'>
					<a
						href='https://github.com/'
						target='_blank'
						rel='noopener noreferrer'
						className='mr-4'>
						<FaGithub className='text-gray-400 hover:text-gray-200 h-6 w-6' />
					</a>
					<a
						href='https://twitter.com/'
						target='_blank'
						rel='noopener noreferrer'>
						<FaTwitter className='text-gray-400 hover:text-gray-200 h-6 w-6' />
					</a>
				</div>
			</div>
		</footer>
	)
}

export { Header, Footer }
