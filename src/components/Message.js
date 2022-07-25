import { useState } from "react"
import { Container, ListGroup } from "react-bootstrap"

const Message = ({message, user}) => {

    const [showOG, setShowOG] = useState(false)

    let whichUser 
    let event = new Date(message.updatedAt)
    if(message.user.username === user.username){
        whichUser = 'right'
    } else whichUser = 'left'

    const toShowText = () => {
		setShowOG(!showOG)
	}

    return (
        <ListGroup.Item key={message._id} className={whichUser}>
            <div><span className='username'>{message.user.username}</span></div>
            {(showOG && whichUser === 'left') && 
            <div>
                <p onClick={toShowText}>Hide Original Text</p>
                <p className='text' >{message.text}</p>
            </div>			
            }
            {(!showOG && whichUser === 'left') &&
            <div>
                <p onClick={toShowText}>Show Original Text</p>
                <p className='translated' >{message.translatedText}</p>
            </div>
            }
            {(showOG && whichUser === 'right') && 
            <div>
                <p onClick={toShowText}>Hide Translated Text</p>
                <p className='translated' >{message.translatedText}</p>
            </div>
            }
            {(!showOG && whichUser === 'right') &&
            <div>
                <p onClick={toShowText}>Show Translated Text</p>
                <p className='text' >{message.text}</p>
            </div>
            }
            <span>{event.toLocaleTimeString()}</span>
        </ListGroup.Item> 
    )
}

export default Message