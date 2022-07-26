import {Button, ListGroup} from "react-bootstrap";
import '../pages/App/App.css'
import openSocket from 'socket.io-client'
import { useEffect } from "react";
export const socket = openSocket(process.env.BACKEND_URL)

const ConvosList = ({user, convoToShow, users}) => {

  return (
		<ListGroup>
		{user.conversations &&
  		user.conversations.map(convo => {
				const event = new Date(convo.updatedAt)
				const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
				const userObj = Object.entries(user)
				const convoUserObj = Object.entries(convo.users[0])
				const foundUser = userObj[1][1] === convoUserObj[1][1] ? convo.users[1] : convo.users[0]
				const loggedUser = users.find(user => user === foundUser._id)
				console.log(users)
        return (
          <ListGroup.Item key={convo._id}  onClick={convoToShow.bind(null, convo)}>  
					{loggedUser &&
						<p>Active</p>
					}   
            <span>{foundUser.username}</span>
						<span>{event.toLocaleDateString(undefined, options)}</span>
          </ListGroup.Item>
        )
      })
		}
		</ListGroup>
  )
}

export default ConvosList