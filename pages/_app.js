import { Provider } from 'react-redux'
import '../styles/globals.css'
import { store } from '../store'
import Layout from '../components/Layout'
import { ClerkProvider } from '@clerk/nextjs'

function MyApp({ Component, pageProps }) {
	return (
		<ClerkProvider>
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</ClerkProvider>
	)
}

export default MyApp
