import React, { useEffect, useState } from "react";

function SearchRooms({ userData }){
    
    const [ allRooms, setAllRooms ] = useState([])
    const [ join, setJoin ] = useState(false)
    
    const [ roomName, setRoomName ] = useState('')
    const [ roomDesc, setRoomDesc ] = useState('')
    const [ roomRules, setRoomRules ] = useState('')

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

    // function handleJoin(room){
    //     setJoin(true)
    //     // fetch('http://localhost:3000/join', {
    //     //     method: "POST",
    //     //     headers:{
    //     //         "Content-Type":"application/json"
    //     //     },
    //     //     body: JSON.stringify({
    //     //         user_id: userData.id,
    //     //         chat_room_id: room.id
    //     //     })
    //     // })
    //     // .then(r => r.json())
    //     // .then(data => console.log(data))
    // }

    function handleNewRoom(e){
        e.preventDefault()
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
        .then(data => console.log(data))
    }

    const rooms = allRooms.map(room => {
        return(
            <div key={room.title}>
                <h2>{room.title}</h2>
                <button onClick={() => setJoin(true)}>{join ? "Joined" : "Join"}</button>
            </div>
        )
    })

    return(
        <div>   
            {rooms}
            {allRooms.length === 0 ? "You have no rooms to join in" : ""}
            <br />
            <button>Create Room</button>
            <div className="create-room">
                <h1>New Room</h1>
                <form onSubmit={handleNewRoom}>
                    <label htmlFor="new-room-name">Room Name:</label>
                    <input onChange={(e) => setRoomName(e.target.value)}  className="new-room-name"/>
                    <br />
                    <label htmlFor="new-room-description">Room Description:</label>
                    <input onChange={(e) => setRoomDesc(e.target.value)}  className="new-room-description"/>
                    <br />
                    <textarea onChange={(e) => setRoomRules(e.target.value)}  rows="8" cols="50"  className="new-room-rules" placeholder="Rules"/>
                    <br />
                    <button type="submit" className="send-btn">Create</button>
                </form>
            </div>
        </div>
    )
}

export default SearchRooms