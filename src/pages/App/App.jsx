import React, { useState, useEffect } from 'react';
import './App.css'
import ConvosList from '../../components/ConvosList.js'
import Convo from '../../components/Conversation.js'
import AuthGateway from '../AuthGateway/AuthGateway.js'
import SearchUser from '../../components/SearchUser'
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import openSocket from 'socket.io-client'
export const socket = openSocket(process.env.BACKEND_URL)


function App(){
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null)
  const [convo, setConvo] = useState(null)
	const [session, setSession] = useState(null)
	const [users, setUsers] = useState([])

	useEffect(() => {
		socket.on('users', (users) => {
			console.log(users)
				setUsers(users)
		})
	}, [])

  const handleRegister = async (formData) => {
  	const registerResponse = await fetch('/users/register', {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const parsedResponse = await registerResponse.json()
    console.log(parsedResponse)
    if(parsedResponse.status === 200){
      setUser(parsedResponse.user)
      setLoggedIn(true)
    } else if(parsedResponse.status === 401){
      setError(parsedResponse.message)
    } else {
      setError(parsedResponse.error)
    }
  }

  const handleLogin = async (formData) => {
    const loginResponse = await fetch('/users/login', {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const parsedResponse = await loginResponse.json()
    console.log(parsedResponse);
    if(parsedResponse.status === 200){
			setSession(parsedResponse.session)
      setUser(parsedResponse.user)
      setLoggedIn(true)
    } else if(parsedResponse.status === 401 || parsedResponse.status === 402){
      setError(parsedResponse.message)
    } else {
      setError(parsedResponse.error)
      }
  }

	const getUserInfo = async () => {
		console.log('hello')
		const response = await fetch(`/users/current`, {
			credentials: "include"
		})
		const parsedResponse = await response.json()
		console.log(parsedResponse)
		if(parsedResponse.status === 200){
			setUser(parsedResponse.user)
		} else {
			setError(parsedResponse.error)
		}
	}

  const convoToShow = (convo) => {
    setConvo(convo)
  }
   
	if(session){
		socket.emit('user', session.userId)
		setSession(null)
	}
  if(error) {
    return (
      <p>{error}</p>
    )
  }

  return(
  	<Container>
      {loggedIn ? 
      <Row>
        <Col xl={4} lg={4} md={4} sm={3}>
          <SearchUser convoToShow={convoToShow} getUserInfo={getUserInfo} />    
          <ConvosList user={user} users={users} convoToShow={convoToShow}/>
				</Col>
				<Col xl={8} lg={8} md={8} sm={9}>    
          {convo &&                            
            <Convo convo={convo} getUserInfo={getUserInfo} user={user}/>
          }
        </Col>
      </Row>
      :   
      <AuthGateway handleLogin={handleLogin} handleRegister={handleRegister}/>            
      }
    </Container>
  )
}

export default App;
