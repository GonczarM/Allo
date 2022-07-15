
const ConvosList = ({user, convoToShow}) => {

    return (
        <>
            <ul>
                {user.conversations.map(convo => {
                    return (
                    <li key={convo._id}>
                        <button 
                            onClick={convoToShow.bind(null, convo._id)}
                        >
                        {user.username === convo.users[0].username ? convo.users[1].username : convo.users[0].username}
                        </button><br/>
                    </li> 
                    )
                })}
            </ul>
        </>
    )
}

export default ConvosList