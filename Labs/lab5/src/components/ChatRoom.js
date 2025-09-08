import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './ChatRoom.css';

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch messages from json-server
    fetch('http://localhost:5000/ChatRoom')
      .then(response => response.json())
      .then(data => setMessages(data.messages));
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = {
      id: `message${messages.length + 1}`,
      text: newMessage,
      senderId: 'user1',
      timestamp: new Date().toLocaleString()
    };
    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="chatroom-container">
      {/* Carousel (Visual Home) */}
      <Carousel className="home-carousel" controls={false} indicators={false} interval={3000} pause={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/Hocbong.png"
            alt="First slide"
          />
          <Carousel.Caption>
         
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/TBTS.png"
            alt="Second slide"
          />
          <Carousel.Caption>
        
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/360.webp"
            alt="Third slide"
          />
          <Carousel.Caption>
         
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/" className="breadcrumb-link">Home</a> / <span>Chat Room</span>
      </div>

      {/* Chat Messages */}
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <strong>{msg.senderId}:</strong> {msg.text}
            <div className="timestamp">{msg.timestamp}</div>
          </div>
        ))}
      </div>

      {/* Message Form */}
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="message-button">Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;
