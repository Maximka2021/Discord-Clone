import React, { useState } from "react";
import { useNavigate } from "react-router";

function LogIn({ setUserData }){

    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername = (e) => setUsername(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const navigate = useNavigate()
    
    function handleLogIn(e){
        e.preventDefault()
        fetch('http://localhost:3000/auth/login', {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            if(data.user.id){
                setError('')
                setUserData(data)
                console.log(data)
                localStorage.setItem('jwt', data.token)
                navigate('/chat_rooms')
            }else if(data.error){
                setError(data.error)
            }
        })
    }

    return(
        <div>
            <h1>LogIn</h1>
            <form onSubmit={handleLogIn}>
                <input placeholder="username" onChange={handleUsername} />
                <input placeholder="password" onChange={handlePassword}/>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default LogIn