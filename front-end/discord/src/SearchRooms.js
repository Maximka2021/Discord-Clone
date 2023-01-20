import React, { useEffect, useState } from "react";
import NewRooms from "./NewRooms";
import { useNavigate } from "react-router";

function SearchRooms({ userData }){
    
    const [ allRooms, setAllRooms ] = useState([])
    
    const [ roomName, setRoomName ] = useState('')
    const [ roomDesc, setRoomDesc ] = useState('')
    const [ roomRules, setRoomRules ] = useState('')
    const [ showCreate, setShowCreate ] = useState(false)

    const [ filterName, setFilterName] = useState('')

    const navigate = useNavigate()

    const userRooms = userData.chat_rooms?.map(room => room.title)
    
    useEffect(() => {
        if(userData.id){
            fetch('http://localhost:3000/chat_rooms')
            .then(r => r.json())
            .then(data => {
            const x = data.filter(item => !userRooms.includes(item.title))
            setAllRooms(x)
        })
        }
    }, [userData])

    function handleNewRoom(e){
        e.preventDefault()
        console.log("Hi")
        setShowCreate(false)
        if(roomName === "" || roomName === null){
            alert("Name cannot be empty")
        }else{
        fetch('http://localhost:3000/chat_rooms', {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                title: roomName,
                description: roomDesc,
                rules: roomRules
            })
        })
        .then(r => r.json())
        .then(data => setAllRooms([...allRooms, data]))
        }
    }

    const newArray = allRooms.filter(room => {
        return room.title.toLowerCase().includes(filterName.toLowerCase())
    })

    const rooms = newArray.map(room => {
        return(
            <NewRooms room={room} key={room.id} userData={userData} />
        )
    })

    return(
        <div className="search-rooms-main"> 
        <input className="input"  onChange={(e) => setFilterName(e.target.value)} />  
            <button onClick={() => setShowCreate(true)}>Create Room</button>
            {rooms}
            {allRooms.length === 0 ? "You have no rooms to join in" : ""}
            <br />
            <div className={showCreate ? "create-room" : "hide"}>
                <h1 style={{color: "rgb(223, 128, 3)"}}>New Room</h1>
                <div>
                    <button onClick={() => setShowCreate(false)}  className="close-button">X</button>
                    <label htmlFor="new-room-name" style={{color: "rgb(223, 128, 3)"}}>Room Name:</label>
                    <input className="input"  onChange={(e) => setRoomName(e.target.value)}/>
                    <br />
                    <label htmlFor="new-room-description" style={{color: "rgb(223, 128, 3)"}}>Room Description:</label>
                    <input className="input"  onChange={(e) => setRoomDesc(e.target.value)}/>
                    <br />
                    <textarea onChange={(e) => setRoomRules(e.target.value)}  rows="8" cols="50"  className="new-room-rules" placeholder="Rules"/>
                    <br />
                    <button onClick={handleNewRoom} className="create-btn" style={{color: "rgb(223, 128, 3)"}}>Create</button>
                </div>
            </div>
            <button className="back-to-chat-rooms-btn" onClick={() => navigate('/chat_rooms')}>Back to Chat Rooms</button>
        </div>
    )
}

export default SearchRooms