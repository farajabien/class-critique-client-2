import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LoadingScreen from '../../components/molecules/LoadingScreen'
import { SignUp, SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import { useDispatch, useSelector } from 'react-redux'
import { getUniversities } from '../../actions/uniActions'

const RegisterPage = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const { user, isLoading } = useUser()
	const { unis: universities, error: uniError } = useSelector(
		(state) => state.uniReducer
	)
	useEffect(() => {
		dispatch(getUniversities())
	}, [])
	useEffect(() => {
		// IF USER IS SIGNED IN, REDIRECT TO PROFILE
		if (user && !isLoading) {
			console.log(user)
		}
	}, [user, isLoading])

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
			{isLoading ? (
				<LoadingScreen />
			) : (
				<>
					<SignedIn>
						{user && <p>Welcome {user.fullName}</p>}
						<Link
							href='/auth/profile'
							className='text-blue-500 hover:underline'>
							Go to your profile
						</Link>
					</SignedIn>
					<SignedOut>
						<SignUp
							path='/auth/register'
							routing='path'
							signInUrl='/auth/login'
						/>
					</SignedOut>
				</>
			)}
		</div>
	)
}

export default RegisterPage
