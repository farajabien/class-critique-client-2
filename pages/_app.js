import { Provider } from 'react-redux'
import '../styles/globals.css'
import { store } from '../store'
import Layout from '../components/Layout'
import { ClerkProvider } from '@clerk/nextjs'

function MyApp({ Component, pageProps }) {
	return (
		<ClerkProvider
			appearance={{
				elements: {
					formButtonPrimary:
						'bg-teal-500 hover:bg-teal-600 text-sm normal-case',
				},
				variables: {
					colorPrimary: '#008080',
					colorBackground: 'white',
				},
			}}>
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</ClerkProvider>
	)
}

export default MyApp
