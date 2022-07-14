import React, {useState} from 'react'
// import Logo from '../../Images/logo.png'

function Register({toggleLogin, handleRegister}){
	const [username, setUsername] = useState(null)
	const [password, setPassword] = useState(null)
	const [language, setLanguage] = useState(null)
	const [location, setLocation] = useState(null)
	return(
		<div className='login'>
			{/* <img src={Logo} alt='allo logo'/> */}
			<form className='form' onSubmit={(event) => {
				event.preventDefault()
				if(!language || language === 'null'){
					console.log('nope');
				}
				else{
					handleRegister({username, password, language})
				}
			}}>
				<input type='text' placeholder='Username' onChange={e => setUsername(e.target.value)}/><br/>
				<select className='select' onChange={e => setLanguage(e.target.value)}>
					<option value='null'>Choose your Prefered Language</option>
					<option value="ar">Arabic</option>
					<option value="cs">Czech</option>
					<option value="da">Danish</option>
					<option value="nl">Dutch</option>
					<option value="en">English</option>
					<option value="fi">Finish</option>
					<option value="fr">French</option>
					<option value="de">German</option>
					<option value="hi">Hindi</option>
					<option value="hu">Hungarian</option>
					<option value="it">Italian</option>
					<option value="ja">Japanese</option>
					<option value="ko">Korean</option>
					<option value="nb">Norwegian Bokmal</option>
					<option value="pl">Polish</option>
					<option value="pt">Portuguese</option>
					<option value="ru">Russian</option>
					<option value="zh">Simplified Chinese</option>
					<option value="es">Spanish</option>
					<option value="sv">Swedish</option>
					<option value="zh-TW">Traditional Chinese</option>
					<option value="tr">Turkish</option>
				</select><br/>
				<input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/><br/>
				<button className='loginButton' value='Register'>Register</button>
			</form>
			<div className='switch'>
				<button onClick={toggleLogin}>Login Here</button>
			</div>
		</div>
	)
}

export default Register