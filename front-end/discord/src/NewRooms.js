import React from "react";
import { useState } from "react";

function NewRooms({ room, handleJoin, userData }){

    const [ join, setJoin ] = useState(false)


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
    
    return(
        <div className='flip-card'>
            <div key={room.title} className="flip-card-inner">
                <div className="flip-card-front">
                    <h2 className="room-title" style={{color: "rgb(223, 128, 3)"}}>{room.title}</h2>
                </div>
                    <div className="flip-card-back">
                        <button className="join-button"  key={room.id} onClick={() => handleJoin(room)}>{join ? "Joined" : "Join"}</button>
                    </div>
            </div>
        </div>
    )
}

export default NewRooms