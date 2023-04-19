import React, { useEffect, useState } from 'react'
import { register } from '../../actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LoadingScreen from '../../components/molecules/LoadingScreen'
import { getUniversities } from '../../actions/uniActions'

const RegisterPage = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
		gender: '',
		university: '',
	})
	const { error, loading } = useSelector((state) => state.authReducer)
	const universities = useSelector((state) => state.uniReducer.unis)
	const dispatch = useDispatch()
	const router = useRouter()

	const handleSubmit = async (event) => {
		event.preventDefault()
		dispatch(register(user))
	}

	useEffect(() => {
		dispatch(getUniversities())
	}, [])

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
			{loading && <LoadingScreen />}
			<div className='max-w-md w-full'>
				<div>
					<h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
						Sign up for an account
					</h2>

					<p className='mt-2 text-center text-sm leading-5 text-gray-600 max-w'>
						Already have an account?{' '}
						<Link
							href='/auth/login'
							className='font-medium text-teal-600 hover:text-teal-500 focus:outline-none focus:underline transition ease-in-out duration-150'>
							Log in
						</Link>
					</p>
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
											<path
												fillRule='evenodd'
												d='M17.53 2.47a1 1 0 0 1 0 1.41L4.12 18.97a1 1 0 0 1-1.41 0l-2-2a1 1 0 0 1 0-1.41l13.41-13.4a1 1 0 0 1 1.41 0l2 2zm-2.06-1.06a3 3 0 0 0-4.24 0L8 9.76 7 8.76a3 3 0 0 0-4.24 0L.29 9.17a3 3 0 0 0 0 4.24l5.46 5.46a3 3 0 0 0 4.24 0l2.12-2.12 4.95-4.95a3 3 0 0 0 0-4.24z'
											/>
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
									aria-label='Name'
									name='name'
									type='text'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-teal focus:border-teal-300 focus:z-10 sm:text-sm sm:leading-5'
									placeholder='Name'
									value={user.name}
									onChange={(e) => setUser({ ...user, name: e.target.value })}
								/>
							</div>

							<div className='-mt-px'>
								<input
									aria-label='Email address'
									name='email'
									type='email'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-teal focus:border-teal-300 focus:z-10 sm:text-sm sm:leading-5'
									placeholder='Email address'
									value={user.email}
									onChange={(e) => setUser({ ...user, email: e.target.value })}
								/>
							</div>

							<div className='-mt-px'>
								<input
									aria-label='Password'
									name='password'
									type='password'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-teal focus:border-teal-300 focus:z-10 sm:text-sm sm:leading-5'
									placeholder='Password'
									value={user.password}
									onChange={(e) =>
										setUser({ ...user, password: e.target.value })
									}
								/>
							</div>

							<div className='-mt-px'>
								<input
									aria-label='Confirm Password'
									name='password2'
									type='password'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-teal focus:border-teal-300 focus:z-10 sm:text-sm sm:leading-5'
									placeholder='Confirm Password'
									value={user.password2}
									onChange={(e) =>
										setUser({ ...user, password2: e.target.value })
									}
								/>
							</div>
						</div>

						<div className='-mt-px'>
							<select
								className='block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-teal focus:border-teal-300'
								value={user.gender}
								onChange={(e) => setUser({ ...user, gender: e.target.value })}
								required>
								<option value='' disabled hidden>
									Gender
								</option>
								<option value='male'>Male</option>
								<option value='female'>Female</option>
								<option value='other'>Other</option>
							</select>
						</div>
						<div className='-mt-px'>
							<select
								className='block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-teal focus:border-teal-300'
								value={user.university}
								onChange={(e) =>
									setUser({ ...user, university: e.target.value })
								}
								required>
								<option value='' disabled hidden>
									Select your university
								</option>
								{universities &&
									universities.map((university) => (
										<option key={university._id} value={university._id}>
											{university.name}
										</option>
									))}
							</select>
						</div>
						<div className='mt-6'>
							<button
								disabled={loading}
								type='submit'
								className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:shadow-outline-teal active:bg-teal-600 transition duration-150 ease-in-out'>
								<span className='absolute left-0 inset-y pl-3'>
									{loading && (
										<svg
											className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'>
											<circle
												className='opacity-25'
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='4'></circle>
											<path
												className='opacity-75'
												fill='currentColor'
												d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16 8 8 0 000 16z'></path>
										</svg>
									)}
								</span>
								{loading ? 'Signing up...' : 'Sign up'}
							</button>
						</div>
						<div className='mt-6'>
							<div className='relative'>
								<div className='absolute inset-0 flex items-center'>
									<div className='w-full border-t border-gray-300'></div>
								</div>
								<div className='relative flex justify-center text-sm leading-5'>
									<span className='px-2 bg-white text-gray-500'>
										Or continue with
									</span>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default RegisterPage
