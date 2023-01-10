import { useState, useEffect } from "react";
import "./App.css";

const ws = new WebSocket("ws://localhost:3000/cable");

function App() {
  
  useEffect(() => {
    fetchMessages();
    }, []);
    
    const [messages, setMessages] = useState([]);
    const [guid, setGuid] = useState("");
    //const messagesContainer = document.getElementById("messages");
    
    ws.onopen = () => {
      console.log("Connected to websocket server");
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
    
    ws.onmessage = (e) => {
      // data is a ping, welcome and subscription confirmation from a backend
      const data = JSON.parse(e.data);
      if (data.type === "ping") return;
      if (data.type === "welcome") return;
      if (data.type === "confirm_subscription") return;
      
      const message = data.message;
      allMessages([...messages, message]);
    };
    
    // useEffect(() => {
      //   resetScroll();
      // }, [messages]);
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        const body = e.target.message.value;
        e.target.message.value = "";
        console.log(body)
        await fetch("http://localhost:3000/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 1,
            chat_room_id: 1,
            body: body
          }),
        });
      };
      
      const fetchMessages = async () => {
        fetch("http://localhost:3000/messages")
        .then(r => r.json())
        .then(data => allMessages(data))
      };
      
      function allMessages(data){
        setMessages(data)
  }

  // const resetScroll = () => {
    //   if (!messagesContainer) return;
    //   messagesContainer.scrollTop = messagesContainer.scrollHeight;
    // };
    
    return (
      <div className="App">
      <div className="messageHeader">
        <h1>Messages</h1>
        <p>Guid: {guid}</p>
      </div>
      <div className="messages" id="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <p>{message.body}</p>
          </div>
        ))}
      </div>
      <div className="messageForm">
        <form onSubmit={handleSubmit}>
          <input className="messageInput" type="text" name="message" />
          <button className="messageButton" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App




// import { useState, useEffect } from 'react'
// import './App.css'

//   const ws = new WebSocket("ws://localhost:3000/cable")

// function App() {
//   const [messages, setMessages] = useState([])
//   const [guid, setGuid] = useState('')

//   ws.onopen = () => {
//     console.log("Connected to websocket server")
//     setGuid(Math.random().toString(36).substring(2, 15))

//     ws.send(
//       JSON.stringify({
//         command: 'subscribe',
//         identifier: JSON.stringify({
//           id: guid,
//           channel: "MessageChannel"
//         })
//       })
//     )
//   }

//   ws.onmessage = (e) => {
//     const data = JSON.parse(e.data)

//     if (data.type === "ping") return;
//     if (data.type === "welcome") return;
//     if (data.type === "confirm_subscription") return;

//     const message = data.message;
//     setMessagesFunc([...messages, message])
//   }

//   function setMessagesFunc(data){
//     setMessages(data)
//   }

//   useEffect(() => {
//     fetchMessages()
//   }, [])

//   const fetchMessages = async () => {
//     fetch("http://localhost:3000/messages")
//     .then(r => r.json())
//     .then(data => setMessages(data))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const body = e.target.message.value;
//     e.target.message.value = "";

//     await fetch("http://localhost:3000/messages", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ body }),
//     });
//   }

//   return (
//     <div className="App">
//         <div className="header">
//           <h1>Chat App</h1>
//           <p>Guid: {guid}</p>
//         </div>
//         <div className="messages" id="messages">
//             {messages.map((message) => (
//               <div className="message" key={message.id}>
//                 <p>{message.body}</p>
//               </div>
//             ))}
//         </div>
//         <div className="messageForm">
//           <form onSubmit={handleSubmit}>
//               <input className="messageInput" type="text" name="text" />
//               <button className="messageButton" type="submit">
//                 Send
//               </button>
//           </form>
//         </div>
//     </div>
//   )
// }

// export default App