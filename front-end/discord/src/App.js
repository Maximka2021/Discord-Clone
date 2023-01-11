import './App.css';
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router';
import LogIn from './LogIn';
import ChatRooms from './ChatRooms';


function App() {
  const token = localStorage.getItem('jwt')
  const [userData, setUserData] = useState([])
  console.log(userData)
  useEffect(() => {
    fetch("http://localhost:3000/me", {
      headers:{
        "Authorization": "bearer " + token
      }
    })
    .then(r => {
      if(r.ok){
        r.json()
        .then(data => {
          setUserData(data)
          console.log(data)
        })
      }
    })
  }, [])

  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<LogIn setUserData={setUserData}/>} />
            <Route path="/chat_rooms" element={ <ChatRooms userData={userData} setUserData={setUserData}/>}/>
        </Routes>
    </div>
  );
}

export default App;
