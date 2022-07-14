import React, { useState, useEffect } from 'react';
// import './App.css'
// import ConvosList from './ConvosList/ConvosList.jsx'
// import Convo from './Convo/Convo.jsx'
import AuthGateway from '../AuthGateway/AuthGateway.js'

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

    const convoToShow = (convoId) => {
        setConvoId(convoId)
    }

    return(
        <div>
            {/* {loggedIn ? 
                <div>            
                <ConvosList user={user} convoToShow={convoToShow}/>
                {convoId &&                            
                    <Convo convoId={convoId}/>
                }
                </div>
            :     */}
                <AuthGateway handleLogin={handleLogin} handleRegister={handleRegister}/>            
            {/* // } */}
        </div>
    )
}

export default App;
