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
                navigate('/loader')
                setTimeout(() => {
                    navigate('/chat_rooms')
                }, 3000)
            }
        })
    }

    function handleNavigate(){
        navigate("/signup")
    }

    return(
        <div className="body">
            <div className="main">
                <h1 className="header">Log In</h1>
                <p>{error}</p>
                <form onSubmit={handleLogIn}>
                    <label for="username" className="label" style={{color: "rgb(223, 128, 3)"}}>Username</label>
                    <br />
                    <input className="input" onChange={handleUsername} />
                    <br />
                    <label for="password" className="label"  style={{color: "rgb(223, 128, 3)"}} >Password</label>
                    <br />
                    <input className="input" type="password"  onChange={handlePassword}/>
                    <br />
                    <button type="submit" className="button">Log In</button>
                </form>
                    <button onClick={handleNavigate} className="button">Sign Up</button>
            </div>

            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
        </div>
    )
}

export default LogIn