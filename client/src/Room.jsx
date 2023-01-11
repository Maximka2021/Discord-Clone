import React from "react";

    const ws = new WebSocket("ws://localhost:3000/cable")

function Room({ chatRoomData }){

    ws.onopen = () => {
        console.log("Connected to a Server")
    }

    return (
        <div>
            <h1>{chatRoomData.title}</h1>
        </div>
    )
}

export default Room