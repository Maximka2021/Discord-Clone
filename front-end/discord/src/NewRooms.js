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
        <div>
            <div key={room.title} className="room-button-holder">
            <h2 className="room-title" style={{color: "rgb(223, 128, 3)"}}>{room.title}</h2>
            {/* <div className="room-description-holder">
                <p className="room-description" style={{color: "rgb(223, 128, 3)"}}>{room.description}</p>
            </div> */}
            <button className="join-button"  key={room.id} onClick={() => handleJoin(room)}>{join ? "Joined" : "Join"}</button>
            </div>
        </div>
    )
}

export default NewRooms