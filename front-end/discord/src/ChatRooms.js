import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ws = new WebSocket("ws://localhost:3000/cable")

function ChatRooms({ userData, setUserData }){

    
    const [ chatRooms, setChatRooms ] = useState([])
    const [showChat, setShowChat] = useState(false)
    const [message, setMessage] = useState('')
    const [room, setRoom] = useState({})
    const [guid, setGuid] = useState('')
    
   const [ newMessages, setNewMessages ] = useState([])

    const navigate = useNavigate()
    const token = localStorage.getItem('jwt')
 
    useEffect(() => {
        fetchMessages()
    }, [])

    ws.onopen = () => {
        console.log("Connected to a Server")
        setGuid(Math.random().toString(36).substring(2, 15))

        ws.send(
            JSON.stringify({
                command: "subscribe",
                identifier: JSON.stringify({
                    id: guid,
                    channel: "MessagesChannel"
                })
            })
        )
    }

    ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === "ping") return;
        if (data.type === "welcome") return;
        if (data.type === "confirm_subscription") return;

        const message = data.message;
        allMessages([...room.messages, message])
        fetch(`http://localhost:3000/chat_rooms/${room.id}`)
        .then(r => r.json())
        .then(data => setRoom(data))
    }

    function handleSubmit(){
        fetch("http://localhost:3000/messages", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                user_id: userData.id,
                chat_room_id: room.id,
                body: message
            })
        })
    }

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
            })
          }
        })
      }, [])

    useEffect(() => {
        fetch(`http://localhost:3000/users/${userData.id}`)
        .then(r => r.json())
        .then(data => setChatRooms(data.chat_rooms))
    }, [userData])

    function toRoom(room){
       setRoom(room)
       setShowChat(true)
        fetch(`http://localhost:3000/chat_rooms/${room.id}`)
        .then(r => r.json())
        .then(data => setRoom(data))

    }
    const rooms = chatRooms?.map(room => {
        return(
            <div>
                <h1 onClick={() => toRoom(room)} key={room.id}>{room.title}</h1>
            </div>
        )
    })
        console.log(room)
    const messages = room.messages?.map(message => {
        return(
            <p>{message.body}</p>
        )
    })

    function handleLogOut(){
        setUserData({})
        localStorage.clear()
        navigate('/')
    }

    const handleMessage = (e) => {
        setMessage(e.target.value)
    }

    const fetchMessages = async () => {
        fetch("http://localhost:3000/messages")
        .then(r => r.json())
        .then(data => allMessages(data))
    }

    function allMessages(data){
        setNewMessages(data)
    }

    return(
        <div>
            <h1>Chat Rooms</h1>
            <h2>Welcome {userData.username}</h2>
            {rooms}
            <button onClick={handleLogOut}>Log Out</button>
            <div className={showChat ? "show" : "hide"}>
                <h1>{room.title}</h1>
                {messages}
                <input  placeholder="message" onChange={handleMessage}/>
                <button onClick={handleSubmit}>Send</button>
            </div>
        </div>

    )
}

export default ChatRooms