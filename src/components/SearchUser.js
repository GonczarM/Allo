import { useState } from "react";

const SearchUser = ({ convoToShow }) => {
    const [username, setUsername] = useState('')
    const [foundUser, setFoundUser] = useState('')

    const handleChange = (e) => {
        setUsername(e.target.value)
    }

    const handleSubmit = async () => {
        const userResponse = await fetch(`/users/search/${username}`, {
			'credentials': 'include'
		})
		const parsedResponse = await userResponse.json()
		console.log(parsedResponse);
		if(parsedResponse.status === 200){
			setFoundUser(parsedResponse.user)
		}
    }

    const createConvo = async () => {
		const convoResponse = await fetch(`/convos/${username}`, {
			method: "POST",
			credentials: "include"
		})
		const parsedResponse = await convoResponse.json()
        console.log(parsedResponse)
		if(parsedResponse.status === 200){
            setFoundUser('')
            convoToShow(parsedResponse.convo._id)
		}
	}


        return (
            <div className='searchUsers'>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}>
                    <input type='text' value={username} name='username' placeholder='Search by username' onChange={handleChange}/>
                    <button className='search' >Search</button>
                </form>
                {foundUser && 
                <button className='user' onClick={createConvo}>{foundUser.username}</button>
                }
            </div>
        )
}

export default SearchUser;