import { Header, Footer } from './layoutComps'

const Layout = ({ children }) => {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />

			<main className='flex-grow'>{children}</main>

			<Footer className='mt-auto' />
		</div>
	)
}

export default Layout
