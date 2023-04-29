import { useUser } from '@clerk/nextjs'
import { Header, Footer } from './layoutComps'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Layout = ({ children }) => {
	const router = useRouter()
	const dispatch = useDispatch()

	const { user, isLoading } = useUser()

	useEffect(() => {
		if (user && !isLoading) {
			//SAVE USER ID FROM CLERK
		}
	}, [user, isLoading])
	const { userData, error: userDataError } = useSelector(
		(state) => state.authReducer
	)

	return (
		<div className='flex flex-col min-h-screen'>
			<Header />

			<main className='flex-grow'>{children}</main>

			<Footer className='mt-auto' />
		</div>
	)
}

export default Layout
