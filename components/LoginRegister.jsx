import React, { useEffect, useState } from 'react'
import LoadingScreen from './molecules/LoadingScreen'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/authActions'

function LoginModal({ onClose }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { error, loading } = useSelector((state) => state.authReducer)
	const dispatch = useDispatch()
	const router = useRouter()

	const handleEmailChange = (event) => {
		setEmail(event.target.value)
	}

	const handlePasswordChange = (event) => {
		setPassword(event.target.value)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		dispatch(login({ email, password }, { isModal: true }))
	}

	useEffect(() => {
		console.log('WAAAAh', error)
	}, [error])

	return (
		<div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
			<div className='bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-md'>
				<div className='px-6 py-4'>
					<h2 className='text-2xl font-medium text-gray-800 mb-4'>
						Log in to your account
					</h2>
					<form onSubmit={handleSubmit} className='mt-8'>
						{error && (
							<div
								className='mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'
								role='alert'>
								<div className='flex'>
									<div className='py-1'>
										<svg
											className='fill-current h-6 w-6 text-red-500 mr-4'
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 20 20'>
											<path d='M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z' />
										</svg>
									</div>
									<div>
										<p className='font-bold'>Error</p>
										<p className='text-sm'>{error}</p>
									</div>
								</div>
							</div>
						)}

						<input type='hidden' name='remember' value='true' />
						<div className='rounded-md shadow-sm'>
							<div>
								<input
									aria-label='Email address'
									name='email'
									type='email'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
									placeholder='Email address'
									value={email}
									onChange={handleEmailChange}
								/>
							</div>
							<div className='-mt-px'>
								<input
									aria-label='Password'
									name='password'
									type='password'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
									placeholder='Password'
									value={password}
									onChange={handlePasswordChange}
								/>
							</div>
						</div>
						{error && (
							<div className='mt-2 text-red-500 text-sm'>{error.message}</div>
						)}
						<div className='mt-6 flex items-center justify-between'>
							<div className='flex items-center'>
								<input
									id='remember_me'
									type='checkbox'
									className='form-checkbox h-4 w-4 text-teal-600 transition duration-150 ease-in-out'
								/>
								<label
									htmlFor='remember_me'
									className='ml-2 block text-sm leading-5 text-gray-900'>
									Remember me
								</label>
							</div>{' '}
							<div className='text-sm leading-5'>
								<Link
									href='/forgot-password'
									className='font-medium text-teal-600 hover:text-teal-500 focus:outline-none focus:underline transition ease-in-out duration-150'>
									Forgot your password?
								</Link>
							</div>
						</div>

						<div className='mt-6'>
							<button
								type='submit'
								className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition duration-150 ease-in-out'
								disabled={loading}>
								<span className='absolute left-0 inset-y-0 flex items-center pl-3'>
									<svg
										className='h-5 w-5 text-teal-500 group-hover:text-teal-400 transition ease-in-out duration-150'
										fill='currentColor'
										viewBox='0 0 20 20'>
										<path
											fillRule='evenodd'
											d='M12.2929,7.29289 C12.6534,6.93241 13.2206,6.90468 13.6129,7.2097 L13.7071,7.29289 L16.7071,10.2929 C17.0976,10.6834 17.0976,11.3166 16.7071,11.7071 L13.7071,14.7071 C13.3466,15.0676 12.7794,15.0953 12.3871,14.7903 L12.2929,14.7071 L9.29289,11.7071 C8.90237,11.3166 8.90237,10.6834 9.29289,10.2929 L12.2929,7.29289 Z M4,10 C4,6.68629 6.68629,4 10,4 C13.3137,4 16,6.68629 16,10 C16,13.3137 13.3137,16 10,16 C6.68629,16 4,13.3137 4,10 Z M10,14 C11.6569,14 13,12.6569 13,11 C13,9.34315 11.6569,8 10,8 C8.34315,8 7,9.34315 7,11 C7,12.6569 8.34315,14 10,14 Z'
											clipRule='evenodd'
										/>
									</svg>
								</span>
								{loading ? <LoadingScreen /> : 'Sign in'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default LoginModal
