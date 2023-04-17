import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { logout } from '../actions/authActions'

import { useRouter } from 'next/router'

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)
	const dispatch = useDispatch()
	const { user, token, error, loading } = useSelector(
		(state) => state.authReducer
	)
	const router = useRouter()

	const handleLogout = () => {
		dispatch(logout())
		router.push('/auth/login')
	}

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<header className='bg-teal-500 flex justify-between items-center py-4 px-6 md:px-12 lg:px-16'>
			<div className='flex items-center space-x-4'>
				<Link
					href='/'
					className='flex items-center space-x-2 font-bold text-2xl md:text-3xl text-white'>
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
					className='text-white text-lg md:text-xl hover:text-teal-200 focus:text-teal-200 transition-colors duration-300'>
					<span>Universities</span>
				</Link>

				{!user && (
					<Link
						href='/auth/login'
						className='flex items-center space-x-2 bg-white text-teal-200 px-4 py-2 rounded-full text-lg md:text-xl hover:bg-teal-600 hover:text-teal-50 focus:bg-teal-600 transition-colors duration-100'>
						<AiOutlineUserAdd />
						<span>Sign In</span>
					</Link>
				)}

				{user && (
					<>
						<Link
							href='/profile'
							className='flex items-center space-x-2 text-white text-lg md:text-xl hover:text-teal-200 focus:text-teal-200 transition-colors duration-300'>
							<HiOutlineUserCircle />
							<span>Profile</span>
						</Link>
						<button
							onClick={
								user && token ? handleLogout : () => router.push('/auth/login')
							}
							className='flex items-center space-x-2 bg-white text-teal-500 px-4 py-2 rounded-full text-lg md:text-xl hover:bg-teal-600 hover:text-white focus:bg-teal-600 transition-colors duration-300'>
							<AiOutlineLogin />
							<span>{user && token ? 'Logout' : 'Login'}</span>
						</button>
					</>
				)}
			</nav>
		</header>
	)
}

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
