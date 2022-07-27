import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

const SearchUser = ({ convoToShow, getUserInfo, socket }) => {
  const [username, setUsername] = useState('')
  const [foundUser, setFoundUser] = useState('')
	const [socketConvo, setSocketConvo] = useState(null)

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

	useEffect(() => {
    console.log('convo socket')
		socket.on('convo', (convo) => {
      if(convo){
        console.log('convo socket triggered')
			  getUserInfo()
      }
		})
	}, [])

  const handleSubmit = async () => {
    const userResponse = await fetch(`/users/search/${username}`, {
			'credentials': 'include'
		})
		const parsedResponse = await userResponse.json()
		console.log(parsedResponse);
		if(parsedResponse.status === 200){
			setFoundUser(parsedResponse.user)
		}
  }

  const createConvo = async () => {
		const convoResponse = await fetch(`/convos/${username}`, {
			method: "POST",
			credentials: "include"
		})
		const parsedResponse = await convoResponse.json()
    console.log(parsedResponse)
		if(parsedResponse.status === 200){
      setFoundUser('')
      convoToShow(parsedResponse.convo)
			setSocketConvo(parsedResponse.convo)
		}
	}

	if(socketConvo){
		socket.emit('convo', socketConvo)
		setSocketConvo(null)
	}
  console.log('searchuser')
  return (
    <>
      <Form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}>
        <Form.Group className='"mb-3' controlId="formBasic">
          <Form.Control  
            type='text' 
            value={username} 
            name='username' 
            placeholder='Search by username' 
            onChange={handleChange}
          />
        	<Button variant="primary" type='submit' >Search</Button>
        </Form.Group>
      </Form>
      {foundUser && 
        <Button onClick={createConvo}>{foundUser.username}</Button>
      }
    </>
  )
}

export default SearchUser;