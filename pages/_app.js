import { Provider } from 'react-redux'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { store } from '../store'
import Layout from '../components/Layout'
//provider redux

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<SessionProvider session={pageProps.session}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</SessionProvider>
		</Provider>
	)
}

export default MyApp
