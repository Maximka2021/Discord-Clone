import React, { useState } from "react";
import { useNavigate } from "react-router";
function SignUp({ setUserData }) {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  function handleSignUp(e) {
    e.preventDefault();
    if (password === confirmPassword) {
      fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.user.id) {
            setUserData(data.user);
            navigate("/chat_rooms");
            localStorage.setItem("jwt", data.token);
          } else if (data.error) {
            setError(data.error);
          }
        });
    } else {
      console.log("Passwords should match");
    }
  }

  return (
    <div className="body">
      <div className="main">
        <h1 className="header">Sign Up</h1>
        <p>{error}</p>
        <form onSubmit={handleSignUp}>
          <label className="label" for="username" style={{color: "rgb(223, 128, 3)"}}>Username</label>
          <br />
          <input className="input" onChange={handleUsername} />
          <br />
          <label className="label" for="email" style={{color: "rgb(223, 128, 3)"}}>Email</label>
          <br />
          <input className="input" onChange={handleEmail} />
          <br />
          <label className="label" for="password" style={{color: "rgb(223, 128, 3)"}}>Password</label>
          <br />
          <input className="input" type="password"  onChange={handlePassword} />
          <br />
          <label className="label" for="confirm password" style={{color: "rgb(223, 128, 3)"}}>Confirm Password</label>
          <br />
          <input className="input" type="password"  onChange={handleConfirmPassword}/>
          <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
