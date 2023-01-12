import React, { useState } from "react";
import { useNavigate } from "react-router";
function SignUp({ setUserData }){

    const navigate = useNavigate()

    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleUsername = (e) =>  setUsername(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value)

    function handleSignUp(e){
        e.preventDefault()
        if(password === confirmPassword){
            fetch("http://localhost:3000/signup", {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            })
            .then(r => r.json())
            .then(data => {
                if(data.user.id){
                    setUserData(data.user)
                    navigate('/chat_rooms')
                    localStorage.setItem("jwt", data.token)
                }else if(data.error){
                    setError(data.error)
                }
            })
        }else{
            console.log("Passwords should match")
        }
    }

    return(
        <div>
            <h1>Sign Up</h1>
            <p>{error}</p>
            <form onSubmit={handleSignUp}>
                <input placeholder="username" onChange={handleUsername} />
                <input placeholder="email" onChange={handleEmail}/>
                <input placeholder="password" onChange={handlePassword} />
                <input placeholder="confirm password" onChange={handleConfirmPassword} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp