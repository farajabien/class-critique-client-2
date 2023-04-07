import { useState } from 'react'

const Register = () => {
	const [name, setName] = useState({
		firstName: '',
		lastName: '',
	})
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = () => {
		// do something
	}

	return (
		<div>
			<input
				type='firstName'
				name='firstName'
				value={name.firstName}
				onChange={(e) =>
					setName({
						...name,
						firstName: e.target.value,
					})
				}
			/>

			<input
				type='lastName'
				name='lastName'
				value={name.lastName}
				onChange={(e) =>
					setName({
						...name,
						lastName: e.target.value,
					})
				}
			/>

			<input
				type='email'
				name='email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				name='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleLogin}>Sign Up</button>
		</div>
	)
}

export default Register
