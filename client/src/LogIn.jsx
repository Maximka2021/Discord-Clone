import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogIn({ setUserData }){

    const link = "http://localhost:3000"
    const navigate = useNavigate()

    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername = (e) => setUsername(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    function handleSubmit(e){
        e.preventDefault()
        fetch(`${link}/login`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(r => r.json())
        .then(data => {
            if(data.id){
                setError('')
                setUserData(data)
                navigate('/chat_rooms')
            }else if(data.error){
                setError(data.error)
            }
        })
    }

    return(
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="username" onChange={handleUsername} />
                <input placeholder="password" onChange={handlePassword}/>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default LogIn
