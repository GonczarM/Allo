import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

function Register({toggleLogin, handleRegister}){
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [language, setLanguage] = useState('Choose your Preferred Language')
	const languages = [ {'Choose your Preferred Language': null},
		{Arabic: 'ar'}, {Czech: 'cs'}, {Danish: 'da'}, {Dutch: 'nl'}, {English: 'en'}, {Finish: 'fi'}, 
		{French: 'fr'}, {German: 'de'}, {Hindi: 'hi'}, {Hungarian: 'hu'}, {Italian: 'it'}, 
		{Japanese: 'ja'}, {Korean: 'ko'}, {Norwegian: 'nb'}, {Polish: 'pl'}, {Portuguese: 'pt'}, 
		{Russian: 'ru'}, {Chinese: 'zh'}, {Spanish: 'es'}, {Swedish: 'sv'}, {Turkish: ' tr'}
	]
	return(
		<>
			<Form onSubmit={(event) => {
				event.preventDefault()
				if(language === 'Choose your Preferred Language' || language === null){
					console.log('nope');
				}
				else{
					handleRegister({username, password, language})
				}
			}}>
				<Form.Group className='mb-3'>
					<Form.Label>Username</Form.Label>
					<Form.Control 
						type='text' 
						placeholder='Username' 
						onChange={e => setUsername(e.target.value)}
						value={username}
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label>Language</Form.Label>
					<Form.Select 
						onChange={e => setLanguage(console.log(e.target.value))}
						value={language}
					>
					{languages.map(choice => {
						const langChoice = Object.entries(choice)
						return (
						<option value={langChoice[0][1]}>{langChoice[0][0]}</option>
						)
					})}

					</Form.Select>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control 
						type='password' 
						placeholder='Password' 
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
				</Form.Group>
				<Button value='Register' type='submit'>Register</Button>
			</Form>
			<div>
				<Button onClick={toggleLogin}>Login Here</Button>
			</div>
		</>
	)
}

export default Register