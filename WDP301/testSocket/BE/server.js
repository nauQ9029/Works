const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Track simple rooms for WebRTC signaling
const rooms = new Map(); // roomId => Set(socketId)

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  // Emit a welcome message to the new client
  socket.emit('server_message', {
    text: `Welcome! Your socket id: ${socket.id}`,
    ts: Date.now()
  });

  // Broadcast to others that a user joined
  socket.broadcast.emit('server_message', {
    text: `User joined: ${socket.id}`,
    ts: Date.now()
  });

  // Listen to chat messages
  socket.on('chat_message', (msg) => {
    const payload = { id: socket.id, text: msg, ts: Date.now() };
    // Echo back to sender
    socket.emit('server_message', { text: `You: ${msg}`, ts: Date.now() });
    // Broadcast to others
    socket.broadcast.emit('chat_message', payload);
  });

  socket.on('disconnect', (reason) => {
    console.log('user disconnected', socket.id, reason);
    socket.broadcast.emit('server_message', {
      text: `User left: ${socket.id}`,
      ts: Date.now()
    });

    // Remove from any joined room and notify peers
    if (socket.data && socket.data.roomId) {
      const roomId = socket.data.roomId;
      const set = rooms.get(roomId);
      if (set) {
        set.delete(socket.id);
        if (set.size === 0) {
          rooms.delete(roomId);
        }
      }
      socket.to(roomId).emit('peer_left', { id: socket.id });
      socket.leave(roomId);
      socket.data.roomId = undefined;
    }
  });

  // --- WebRTC signaling handlers ---
  socket.on('join_room', ({ roomId }) => {
    if (!roomId || typeof roomId !== 'string') return;
    const trimmed = roomId.trim();
    if (!trimmed) return;

    // Create room set if needed
    if (!rooms.has(trimmed)) rooms.set(trimmed, new Set());
    const members = rooms.get(trimmed);

    // Prepare peers list (others only)
    const peers = Array.from(members).filter((id) => id !== socket.id);

    // Join room and track on socket
    socket.join(trimmed);
    members.add(socket.id);
    socket.data.roomId = trimmed;

    // Acknowledge join with existing peers
    socket.emit('room_joined', { roomId: trimmed, peers });

    // Notify others that a new peer joined
    socket.to(trimmed).emit('peer_joined', { id: socket.id });
  });

  socket.on('leave_room', () => {
    const roomId = socket.data?.roomId;
    if (!roomId) return;
    const set = rooms.get(roomId);
    if (set) {
      set.delete(socket.id);
      if (set.size === 0) rooms.delete(roomId);
    }
    socket.to(roomId).emit('peer_left', { id: socket.id });
    socket.leave(roomId);
    socket.data.roomId = undefined;
    socket.emit('room_left', { roomId });
  });

  socket.on('webrtc_offer', ({ target, sdp }) => {
    if (!target || !sdp) return;
    io.to(target).emit('webrtc_offer', { from: socket.id, sdp });
  });

  socket.on('webrtc_answer', ({ target, sdp }) => {
    if (!target || !sdp) return;
    io.to(target).emit('webrtc_answer', { from: socket.id, sdp });
  });

  socket.on('webrtc_ice_candidate', ({ target, candidate }) => {
    if (!target || !candidate) return;
    io.to(target).emit('webrtc_ice_candidate', { from: socket.id, candidate });
  });
});

// Broadcast server time to all connected clients every second
setInterval(() => {
  io.emit('server_time', { ts: Date.now() });
}, 30000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`BE listening on http://localhost:${PORT}`);
});
