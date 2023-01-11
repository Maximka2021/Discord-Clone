import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function ChatRooms({ userData, setUserData }){

    const [ chatRooms, setChatRooms ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:3000/chat_rooms')
        .then(r => r.json())
        .then(data => setChatRooms(data))
    }, [])

    const rooms = chatRooms.map(room => {
        return(
            <div>
                <h1 key={room.id}>{room.title}</h1>
            </div>
        )
    })

    function handleLogOut(){
        setUserData({})
        localStorage.clear()
        navigate('/')
    }

    return(
        <div>
            <h1>Chat Rooms</h1>
            <h2>Welcome {userData.username}</h2>
            {rooms}
            <button onClick={handleLogOut}>Log Out</button>
        </div>

    )
}

export default ChatRooms