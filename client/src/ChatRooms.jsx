import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ChatRooms ({ chatRooms, setChatRooms, setChatRoomData, userData}){

    const link = "http://localhost:3000"
    const navigate = useNavigate()
    console.log(userData)
    useEffect(() => {
        fetch(`${link}/chat_rooms`)
        .then(r => r.json())
        .then(data => setChatRooms(data))
    }, [])

    const rooms = chatRooms.map(room => {
        return(
            <div>
                <h3 onClick={() => handleRoomClick(room)} key={room.id}>{room.title}</h3>
            </div>
        )
    })

    function handleRoomClick(room){
        setChatRoomData(room)
        navigate('/room')
    }

    return(
        <div>
            <h1>Chat Rooms</h1>
            <h2>Welcome {userData.username}</h2>
            {rooms}
        </div>
    )
}

export default ChatRooms