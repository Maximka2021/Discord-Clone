import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ws = new WebSocket("ws://localhost:3000/cable");

function ChatRooms({ userData, setUserData }) {

  const [chatRooms, setChatRooms] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState({});
  const [guid, setGuid] = useState("");

  const [newMessages, setNewMessages] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  const [ usernameInPopUp, setUsernameInPopUp ] = useState('')
  const [ displayPopUp, setDisplayPopUp ] = useState(false)

  useEffect(() => {
    fetchMessages();
  }, []);

  ws.onopen = () => {
    console.log("Connected to a Server");
    setGuid(Math.random().toString(36).substring(2, 15));

    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: guid,
          channel: "MessagesChannel",
        }),
      })
    );
  };
  // console.log (room.messages)
  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.type === "ping") return;
    if (data.type === "welcome") return;
    if (data.type === "confirm_subscription") return;

    const message = data.message;
    allMessages([...room.messages, message]);
    fetch(`http://localhost:3000/chat_rooms/${room.id}`)
      .then((r) => r.json())
      .then((data) => setRoom(data));
  };

  function handleSubmit() {
    if (message === "" || message === null) {
      alert("Message cannot be blank");
    } else {
      fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userData.id,
          chat_room_id: room.id,
          body: message,
        }),
      });
    }
  }

  useEffect(() => {
    fetch("http://localhost:3000/me", {
      headers: {
        Authorization: "bearer " + token,
      },
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setUserData(data);
        });
      }
    });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${userData.id}`)
      .then((r) => r.json())
      .then((data) => setChatRooms(data.chat_rooms));
  }, [userData]);

  function toRoom(room) {
    setRoom(room);
    setShowChat(true);
    fetch(`http://localhost:3000/chat_rooms/${room.id}`)
      .then((r) => r.json())
      .then((data) => setRoom(data));
  }

  function handleDisplayPopUp(user){
    setUsernameInPopUp(user.username)
  }

  const rooms = chatRooms?.map((room) => {
    return (
      <div className="rooms-list">
        {/* <img className="room-image" src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"  /> */}
        <h1 className="room" onClick={() => toRoom(room)} key={room.id}>
          {room.title}
        </h1>
      </div>
    );
  });

  const messages = room.messages?.map((message) => {
    return (
      <div
        className={
          message.user.username === userData.username ? "float-right" : "message"
        }
      >
          {/* <div className="username-container">
            <strong className="username">
              {message.user.username === userData.username
                ? ""
                : message.user.username + " "}
            </strong>
          </div> */}
            <div className="message-container">
              <p className="message-body">{message.body}</p>
            </div>
      </div>
    );
  });

  const users = room.users?.map((user) => {
    return (
      <div className="user-info-holder" onClick={() => handleDisplayPopUp(user)}>
        <img
          className="user-image"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3lC0SfgqCcTGipFh64hddM6xgBYQj90wOA&usqp=CAU"
        ></img>
        <p>{user.username}</p>
      </div>
    );
  });

  function handleLogOut() {
    setUserData({});
    localStorage.clear();
    navigate("/");
  }

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const fetchMessages = async () => {
    fetch("http://localhost:3000/messages")
      .then((r) => r.json())
      .then((data) => allMessages(data));
  };

  function allMessages(data) {
    setNewMessages(data);
  }

  function handleToJoin() {
    navigate("/search_rooms");
  }

  return (
    <div className="main-chat-holder">
      <div className="intro-holder">
        <h2>Welcome {userData.username}</h2>
        {rooms}
        <button className="join-btn" onClick={handleToJoin}>
          {" "}
          Join room
        </button>
        <button className="logout-btn" onClick={handleLogOut}>
          Log Out
        </button>
      </div>

    <div className={displayPopUp ? "user-info-container" : "hide" }>
      <button onClick={() => setDisplayPopUp(false)}>X</button>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3lC0SfgqCcTGipFh64hddM6xgBYQj90wOA&usqp=CAU" />
      <p>{usernameInPopUp}</p>
      <button>Follow</button>
    </div>

      <div className={showChat ? "chat-holder" : "hide"}>
        <h1 className="room-title">{room.title}</h1>
        {messages}
        <div className="input-btn-holder">
          <input
            className="input"
            placeholder="Message"
            onChange={handleMessage}
          />
          <button className="send-btn" onClick={handleSubmit}>
            <div class="svg-wrapper-1">
              <div class="svg-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
            </div>
            <span>Send</span>
          </button>
        </div>
      </div>

      <div className="user-holder">{users}</div>
    </div>
  );
}

export default ChatRooms;
