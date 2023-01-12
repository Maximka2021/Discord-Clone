import React, { useEffect, useState } from "react";

function SearchRooms({ userData }){

    const [ allRooms, setAllRooms ] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/chat_rooms')
        .then(r => r.json())
        .then(data => setAllRooms(data))
    }, [])

    const rooms = allRooms.map(room => {
        return(
            <div>
                <h2>{room.title}</h2>
                <button>Join</button>
            </div>
        )
    })

    return(
        <div>   
            {rooms}
        </div>
    )
}

export default SearchRooms