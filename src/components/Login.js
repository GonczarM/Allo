import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

function Login({toggleLogin, handleLogin}){
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	return(
		<>
			<Form onSubmit={(event) => {
				event.preventDefault()
				handleLogin({username, password})
			}}>
				<Form.Group className='"mb-3' controlId="formBasic">
					<Form.Label>Username</Form.Label>
					<Form.Control 
						type='text' 
						placeholder='Username' 
						onChange={e => setUsername(e.target.value)}
						value={username}
					/>
				</Form.Group>
				<Form.Group className='"mb-3' controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password' 
						placeholder='Password' 
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
				</Form.Group>
				<Button variant="primary" type='submit'>Login</Button>
			</Form>
			<Button onClick={toggleLogin}>Create New Account</Button>
		</>
	)
}

export default Login