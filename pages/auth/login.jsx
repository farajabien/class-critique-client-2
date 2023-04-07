import React, { useState } from 'react'

const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [isNewUser, setIsNewUser] = useState(false)

	const handleEmailChange = (event) => {
		setEmail(event.target.value)
	}

	const handlePasswordChange = (event) => {
		setPassword(event.target.value)
	}

	const handleToggleNewUser = () => {
		setIsNewUser(!isNewUser)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log('Login form submitted!')
		// You can add your own logic for authentication here
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full'>
				<div>
					<h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
						{isNewUser ? 'Register a new account' : 'Log in to your account'}
					</h2>
				</div>
				<form onSubmit={handleSubmit} className='mt-8'>
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
						{/* IF NEW USER CONFIRM PASSWORD  */}
						{isNewUser && (
							<div className='-mt-px'>
								<input
									aria-label='Confirm Password'
									name='password'
									type='password'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
									placeholder='Password'
									value={confirmPassword}
									onChange={setConfirmPassword}
								/>
							</div>
						)}
					</div>

					<div className='mt-6 flex items-center justify-between'>
						<div className='flex items-center'>
							<input
								id='remember_me'
								type='checkbox'
								className='form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
							/>
							<label
								htmlFor='remember_me'
								className='ml-2 block text-sm leading-5 text-gray-900'>
								Remember me
							</label>
						</div>

						<div className='text-sm leading-5'>
							<a
								href='#'
								className='font-medium text-teal-400 hover:text-teal-500 focus:outline-none focus:underline transition ease-in-out duration-150'>
								Forgot your password?
							</a>
						</div>
					</div>

					<div className='mt-6'>
						<button
							type='submit'
							className='group relative w-full flex justify-center py-2 px-4 border border-transparent text
							-sm leading-5 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition duration-150 ease-in-out'>
							<span className='absolute left-0 inset-y-0 flex items-center pl-3'>
								<svg
									className='h-5 w-5 text-teal-500 group-hover:text-teal-400 transition ease-in-out duration-150'
									fill='currentColor'
									viewBox='0 0 20 20'>
									<path
										fillRule='evenodd'
										d='M3 6a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6zm3-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6z'
										clipRule='evenodd'
									/>
									<path d='M8 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z' />
								</svg>
							</span>
							{isNewUser ? 'Register' : 'Log in'}
						</button>
					</div>
				</form>
				<div className='mt-6'>
					<button
						type='button'
						onClick={handleToggleNewUser}
						className='group relative w-full flex justify-center py-2 px-4 border border-transparent text
						-sm leading-5 font-medium rounded-md text-teal-600 bg-white hover:bg-gray-50 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition duration-150 ease-in-out'>
						{isNewUser
							? 'Already have an account? Log in'
							: 'Don’t have an account? Register'}
					</button>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
