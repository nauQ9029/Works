const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const server = http.createServer(app);

// In development, the React dev server proxies requests to this backend.
// In production, we'd serve the React build.
const io = new Server(server, {
  cors: {
    origin: '*', // Be permissive for testing via ngrok
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // When a user wants to join a specific room (for chat & video)
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
    // Notify others in the room
    socket.to(roomId).emit('user_joined', { userId: socket.id });
  });

  // Handle chat messages
  socket.on('send_message', (data) => {
    // data should have { roomId, message, sender }
    io.to(data.roomId).emit('receive_message', data);
  });

  // WebRTC Signaling: Offer
  socket.on('offer', (data) => {
    // data: { target, offer, caller }
    socket.to(data.target).emit('offer', data);
  });

  // WebRTC Signaling: Answer
  socket.on('answer', (data) => {
    // data: { target, answer }
    socket.to(data.target).emit('answer', data);
  });

  // WebRTC Signaling: ICE Candidate
  socket.on('ice_candidate', (data) => {
    // data: { target, candidate }
    socket.to(data.target).emit('ice_candidate', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    socket.broadcast.emit('user_disconnected', { userId: socket.id });
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Signaling server running on port ${PORT}`);
});
