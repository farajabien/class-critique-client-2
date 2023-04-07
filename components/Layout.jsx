//import header and footer
import { Header, Footer } from './layoutComps'

const Layout = ({ children }) => {
	return (
		<div>
			<Header />
			{children}
			<Footer />
		</div>
	)
}

export default Layout
