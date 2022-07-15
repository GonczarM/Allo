import React, { useState } from 'react';
// import './App.css'
import ConvosList from '../../components/ConvosList.js'
import Convo from '../../components/Conversation.js'
import AuthGateway from '../AuthGateway/AuthGateway.js'
import SearchUser from '../../components/SearchUser'

function App(){
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null)
    const [convoId, setConvoId] = useState(null)

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
        const loginResponse = await fetch('users/login/', {
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

    const convoToShow = (convoId) => {
        setConvoId(convoId)
    }
    
    if(error) {
      return (
        <p>{error}</p>
      )
    }

    return(
        <div>
            {loggedIn ? 
                <div>
                <SearchUser convoToShow={convoToShow} />            
                <ConvosList user={user} convoToShow={convoToShow}/>
                {convoId &&                            
                    <Convo convoId={convoId}/>
                }
                </div>
            :    
                <AuthGateway handleLogin={handleLogin} handleRegister={handleRegister}/>            
           }
        </div>
    )
}

export default App;
