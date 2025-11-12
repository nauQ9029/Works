# Socket.IO Realtime Test (BE + FE)

A minimal project to test Socket.IO realtime connections with a Node.js backend and a static frontend.

## What’s inside

- `BE/`: Express + Socket.IO server
- `FE/`: Static client using Socket.IO CDN

## Prerequisites

- Node.js 18+ recommended
- Windows PowerShell (you can use any shell)

## Setup

Install dependencies for both apps.

```powershell
# Backend
cd BE; npm install; cd ..

# Frontend
cd FE; npm install; cd ..
```

## Run

Start the backend first, then the React frontend (Vite).

```powershell
# Terminal 1
cd BE; npm start
```

The backend runs at http://localhost:3000

```powershell
# Terminal 2
cd FE; npm run dev
```

The frontend dev server runs at http://localhost:5173

## Test

1. Open the frontend: http://localhost:5173
2. Ensure the Server URL is `http://localhost:3000`
3. Click Connect
4. Open the same page in another tab or browser and send messages
5. You should see messages appear in both tabs in real time

### Video Call (WebRTC)

1. After connecting to the server, scroll to the "Video Call (WebRTC)" section.
2. Keep the default room ID (e.g., `room1`) and click Join in Tab A.
3. Open another tab (Tab B), connect to the server, and Join the same room ID.
4. In Tab A, you should see Tab B's socket id in the Peers list. Click Call to start a 1:1 call.
5. Grant camera/mic permissions when prompted in both tabs.
6. You should see your local and the remote video streams.

Notes:
- This is a simple 1:1 call demo using STUN servers only. In restrictive networks, TURN may be required for media relay.
- Use HTTPS in production to avoid permission issues. Localhost is typically allowed over HTTP for development.
- End a call using Hang Up or by leaving the room.

## Notes

- The FE is a React + Vite app and uses a SocketProvider context to manage the connection.
- CORS is enabled with `origin: *` for simplicity on the backend.
- If ports are in use, change `PORT` in `BE/server.js` or the `-l` port for the FE serve script.
- For production, lock down CORS and consider HTTPS.
