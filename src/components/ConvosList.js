import {Button, ListGroup} from "react-bootstrap";
import '../pages/App/App.css'

const ConvosList = ({user, convoToShow}) => {

  return (
		<ListGroup>
		{user.conversations &&
  		user.conversations.map(convo => {
				const event = new Date(convo.updatedAt)
				const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return (
          <ListGroup.Item key={convo._id}  onClick={convoToShow.bind(null, convo)}>       
            <span>{user.username === convo.users[0].username ? convo.users[1].username : convo.users[0].username}</span>
						<span>{event.toLocaleDateString(undefined, options)}</span>
          </ListGroup.Item>
        )
      })
		}
		</ListGroup>
  )
}

export default ConvosList