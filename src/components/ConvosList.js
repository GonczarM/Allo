import { useEffect, useState } from "react"

const ConvosList = ({user, convoToShow}) => {

    const [showcreateConvo, setShowCreateConvo] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    return (
        <>
            <ul>
                {user.conversations.map(convo => {
                    return (
                    <li key={convo._id}>
                        <button onClick={convoToShow.bind(null, convo._id)}>{convo.users[1].username}</button><br/>
                    </li> 
                    )
                })}
            </ul>
        </>
    )
}

export default ConvosList