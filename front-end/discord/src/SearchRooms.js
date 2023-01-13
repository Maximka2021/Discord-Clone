import React, { useEffect, useState } from "react";

function SearchRooms({ userData }){
    
    const [ allRooms, setAllRooms ] = useState([])
    const [ join, setJoin ] = useState(false)
    
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

    function handleJoin(room){
        setJoin(true)
        fetch('http://localhost:3000/join', {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                user_id: userData.id,
                chat_room_id: room.id
            })
        })
        .then(r => r.json())
        .then(data => console.log(data))
    }

    const rooms = allRooms.map(room => {
        return(
            <div key={room.title}>
                <h2>{room.title}</h2>
                <button onClick={() => handleJoin(room)}>{join ? "Joined" : "Join"}</button>
            </div>
        )
    })

    return(
        <div>   
            {rooms}
            {allRooms.length === 0 ? "You have no more rooms to join in" : ""}
        </div>
    )
}

export default SearchRooms