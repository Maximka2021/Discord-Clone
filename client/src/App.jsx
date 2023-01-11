import { useState, useEffect } from "react";
import "./App.css";
import ChatRooms from "./ChatRooms";
import LogIn from "./LogIn";
import Room from "./Room";
import { Routes, Route } from "react-router-dom";

function App() {
      const link = "http://localhost:3000"
      const [chatRooms, setChatRooms] = useState([])
      const [chatRoomData, setChatRoomData] = useState({})
      const [userData, setUserData] = useState({})

    useEffect(() => {
      fetch("http://localhost:3000/me")
      .then(r => {
          if(r.ok){
            r.json()
            .then(data => {
              setUserData(data)
            })
          }
      })
    }, [])

    return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <LogIn setUserData={setUserData} /> }/>
        <Route path="/chat_rooms" element={ <ChatRooms chatRooms={chatRooms} setChatRooms={setChatRooms} setChatRoomData={setChatRoomData} userData={userData} /> }/>
        <Route path="/room" element={ <Room chatRoomData={chatRoomData} /> }/>
      </Routes>
    </div>
  );
}

export default App
