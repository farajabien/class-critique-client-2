import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LoadingScreen from '../../components/molecules/LoadingScreen'
import { SignIn, SignedIn, SignedOut, useUser } from '@clerk/nextjs'

const LoginPage = () => {
	const router = useRouter()
	const { user, isLoading } = useUser()

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
							className='text-teal-500 hover:underline'>
							Go to your profile
						</Link>
					</SignedIn>
					<SignedOut>
						<SignIn />
					</SignedOut>
				</>
			)}
		</div>
	)
}

export default LoginPage
