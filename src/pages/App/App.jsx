import React, { useState, useEffect } from 'react';
import './App.css'
import ConvosList from '../../components/ConvosList'
import Convo from '../../components/Conversation'
import AuthGateway from '../AuthGateway/AuthGateway'
import SearchUser from '../../components/SearchUser'
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { io } from 'socket.io-client'


function App(){
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null)
  const [convo, setConvo] = useState(null)
	const [users, setUsers] = useState([])
  const [socketConnected, setSocketConnected] = useState(false)
  const socket = io(process.env.BACKEND_URL)
  
	useEffect(() => {
    socket.emit('user', user)
    socket.on('connected', () => {
      console.log('connected')
      setSocketConnected(true)
    })
  //   console.log('user socket')
	// 	socket.on('users', (users) => {
  //     if(users){
  //       console.log('user socket triggered')
	// 			setUsers(users)
  //     }
	// 	})
	}, [user])

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
      setUser(parsedResponse.user)
      setLoggedIn(true)
    } else if(parsedResponse.status === 401 || parsedResponse.status === 402){
      setError(parsedResponse.message)
    } else {
      setError(parsedResponse.error)
      }
  }

	const getUserInfo = async () => {
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
    socket.emit('openConvo', convo._id, user)
    setConvo(convo)
  }
   
	// if(session){
	// 	socket.emit('user', session.userId)
	// 	setSession(null)
	// }
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
          <SearchUser convoToShow={convoToShow} getUserInfo={getUserInfo} socket={socket} />    
          <ConvosList user={user} users={users} convoToShow={convoToShow} />
				</Col>
				<Col xl={8} lg={8} md={8} sm={9}>    
          {convo &&                            
            <Convo convo={convo} getUserInfo={getUserInfo} user={user} socket={socket}/>
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
