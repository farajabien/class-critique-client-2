import { useUser } from '@clerk/nextjs'
import { Header, Footer } from './layoutComps'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Layout = ({ children }) => {
	const router = useRouter()

	const { user, isLoading } = useUser()

	useEffect(() => {
		if (user && !isLoading) {
			//SAVE USER ID FROM CLERK
		}
	}, [user, isLoading])

	useEffect(() => {
		if (router.pathname !== '/auth/login') {
			localStorage.setItem('prevPath', router.pathname)
		}
	}, [router.pathname])

	return (
		<div className='flex flex-col min-h-screen'>
			<Header />

			<main className='flex-grow'>{children}</main>

			<Footer className='mt-auto' />
		</div>
	)
}

export default Layout
