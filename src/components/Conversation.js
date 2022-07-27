import { useEffect, useState } from "react"
import { Container, ListGroup } from "react-bootstrap"
import NewMessage from "./NewMessage"
import Message from './Message'

const Conversation = ({convo, getUserInfo, user, socket}) => {

  	const [messages, setMessages] = useState([])
	const [socketMessage, setSocketMessage] = useState(null)

  	useEffect(() => {
		console.log(convo)
    	getMessages()
  	}, [convo])

	// useEffect(() => {
	// 	console.log('message socket')
	// 	socket.on('message', (msg) => {
	// 		if(msg && user.username !== msg.user.username){
	// 			console.log('messge socket triggered')
	// 			getMessages()
	// 		}
	// 	})
	// }, [])

  	const getMessages = async () => {
		console.log('getmessages')
    	const messagesResponse = await fetch(`/convos/convo/${convo._id}`, {
			credentials: 'include'
		})
		const parsedResponse = await messagesResponse.json()
		console.log(parsedResponse);
		if(parsedResponse.status === 200){
			setMessages(parsedResponse.convo.messages)
		}
  	}

  	const createMessage = async (formData) => {
		const messageResponse = await fetch(`/messages/${convo._id}`, {
			method: "POST",
			credentials: "include",
			body: JSON.stringify(formData),
			headers: {
				"Content-Type": 'application/json'
			}
		})
		const parsedResponse = await messageResponse.json()
		console.log(parsedResponse);
		if(parsedResponse.status === 200){
			setMessages([...messages, parsedResponse.message])
			setSocketMessage(parsedResponse.message)
		}
	}

	if(socketMessage){
		socket.emit('message', socketMessage)
		setSocketMessage(null)
	}

	console.log('convo')
  return (
    <>
		<div>
			<span>
				{user.username === convo.users[0].username ? convo.users[1].username : convo.users[0].username}
			</span>
		</div>
		<Container>
        	<ListGroup>
          	{messages.map(message => {
				console.log(message)
				return (<Message message={message} user={user}/>)
          	})}
        	</ListGroup>
        	<NewMessage createMessage={createMessage} />
		</Container>
    </>
  	)
}

export default Conversation