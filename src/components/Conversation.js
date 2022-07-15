import { useEffect, useState } from "react"
import NewMessage from "./NewMessage"

const Conversation = ({convoId}) => {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        getMessages()
    }, [convoId])

    const getMessages = async () => {
        const messagesResponse = await fetch(`/convos/convo/${convoId}`, {
			credentials: 'include'
		})
		const parsedResponse = await messagesResponse.json()
		console.log(parsedResponse);
		if(parsedResponse.status === 200){
			setMessages(parsedResponse.convo.messages)
		}
    }

    const createMessage = async (formData) => {
		const messageResponse = await fetch(`/messages/${convoId}`, {
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

		}
	}

    return (
        <>
            <ul>
                {messages.map(message => {
                    return (
                    <li key={message._id}>
				        <span className='username'>{message.user.username}</span>
				        <p className='text' >{message.text}</p>
				        <p className='translated' >{message.translatedText}</p>
                    </li> 
                    )
                })}
            </ul>
            <NewMessage createMessage={createMessage} />
        </>
    )
}

export default Conversation