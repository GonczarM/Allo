
import React, {useState} from 'react'

const NewMessage = ({createMessage}) => {
	const [text, setText] = useState("")
	return <form id='message' className='message' onSubmit={(e) => {
		e.preventDefault()
		createMessage({text})
		setText("")
	}}>
		<input type='textarea' placeholder='type a message' onChange={e => setText(e.target.value)} value={text}/>
	</form>
}

export default NewMessage