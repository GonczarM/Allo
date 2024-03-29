import Register from '../../components/Register'
import Login from '../../components/Login'
import { useState } from 'react'

const AuthGateway = ({ handleLogin, handleRegister}) => {
    const [login, setLogin] = useState(true)

	const toggleLogin = (event) => {
        setLogin(!login)
	}

	return(
		<div>
			{login ?
				<Login handleLogin={handleLogin} toggleLogin={toggleLogin}>
				</Login>
				:
				<Register handleRegister={handleRegister} toggleLogin={toggleLogin}>
				</Register>
			}
		</div>
	)
}

export default AuthGateway