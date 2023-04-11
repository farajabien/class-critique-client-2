import { useSelector } from 'react-redux'
import { Header, Footer } from './layoutComps'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Layout = ({ children }) => {
	const token = useSelector((state) => state.authReducer.token)
	const expiresAt = useSelector((state) => state.authReducer.expiresAt)
	const router = useRouter()

	useEffect(() => {
		const currentTime = Date.now() / 1000 // Convert to seconds
		if (expiresAt && expiresAt < currentTime) {
			router.push('/login')
		}
	}, [expiresAt])
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />

			<main className='flex-grow'>{children}</main>

			<Footer className='mt-auto' />
		</div>
	)
}

export default Layout
