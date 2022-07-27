import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

const NewMessage = ({createMessage}) => {
	const [text, setText] = useState("")

	const handleSubmit = (e) => {
		if(e.keyCode == 13 && e.shiftKey == false) {
			e.preventDefault();
			createMessage({text})
			setText("")
		}
	}

	const handleClick = (e) => {
		e.preventDefault();
		createMessage({text})
		setText("")
	}
	console.log('newmessage')
	return (
	<Form id='message' className='message'>
		<Form.Group className='"mb-3' controlId="formBasic">
          	<Form.Control 
				rows={3} 
				as='textarea' 
				placeholder='type a message' 
				onChange={e => setText(e.target.value)}
				onKeyDown={handleSubmit} 
				value={text}
			/>
		</Form.Group>
		<Button onClick={handleClick}>Send Message</Button>
	</Form>
	)
}

export default NewMessage