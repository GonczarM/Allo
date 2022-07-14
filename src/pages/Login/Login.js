import React, {useState} from 'react'
// import Logo from '../../Images/logo.png'

function Login({toggleLogin, handleLogin}){
	const [username, setUsername] = useState(null)
	const [password, setPassword] = useState(null)

	return(
		<div className='login'>
			{/* <img src={Logo} alt='allo logo'/> */}
			<form className='form' onSubmit={(event) => {
				event.preventDefault()
				handleLogin({username, password})
			}}>
				<input type='text' placeholder='Username' onChange={e => setUsername(e.target.value)}/><br/>
				<input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/><br/>
				<button value='Login'>Login</button>
			</form>
			<div className='switch'>
				<button onClick={toggleLogin}>Create New Account</button>
			</div>
		</div>
	)
}

export default Login