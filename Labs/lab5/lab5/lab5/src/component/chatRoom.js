// client/src/components/ChatRoom.js
import React, { useEffect, useState } from 'react';
import './chatroom.css';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/ChatRoom')
      .then((response) => response.json())
      .then((data) => setMessages(data.messages))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="chatroom">
      <h2>Chat Room</h2>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <p>
              <strong>{message.senderId}</strong>: {message.text}
            </p>
            <span>{message.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
