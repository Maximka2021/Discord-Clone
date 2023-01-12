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
            if(data.error){
                setError(data.error)
            }else{
                setError('')
                setUserData(data.user)
                localStorage.setItem('jwt', data.token)
                navigate('/chat_rooms')
            }
        })
    }

    function handleNavigate(){
        navigate("/signup")
    }

    return(
        <div>
            <h1>LogIn</h1>
            <p>{error}</p>
            <form onSubmit={handleLogIn}>
                <input placeholder="username" onChange={handleUsername} />
                <input placeholder="password" onChange={handlePassword}/>
                <button type="submit">Log In</button>
            </form>
                <button onClick={handleNavigate}>Sign Up Instead</button>
        </div>
    )
}

export default LogIn