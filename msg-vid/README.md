# Video App Setup and Testing

This is a Node.js + React.js application for real-time chat and video calling, using Express, Socket.io, and WebRTC.

## Prerequisites
- Node.js installed.
- [ngrok](https://ngrok.com/) installed to test on mobile devices and across the internet.

## Running Locally

1. Install dependencies in the main project folder (React):
   ```bash
   npm install
   ```
2. Install dependencies in the `server` folder (Node backend):
   ```bash
   cd server
   npm install
   cd ..
   ```
3. Start the application (starts both React frontend and Node backend):
   ```bash
   npm run dev
   ```

The app will start at `http://localhost:3000` (frontend), and the backend runs on `http://localhost:4000` (which is proxied automatically in development).

## Testing with ngrok on Multiple Devices

Since WebRTC requires a secure context (HTTPS) for `getUserMedia()` to access the camera and microphone, ngrok provides an easy way to get an HTTPS URL for your locally running application.

1. Ensure your application is running (`npm run dev`).
2. Open a new terminal and start ngrok on port 3000, passing the host header to bypass React's security check for local development:
   ```bash
   ngrok http 3000 --host-header="localhost:3000"
   ```
3. ngrok will output an HTTPS URL (e.g., `https://xxxx-xxxx.ngrok-free.app`).
4. **On your PC**: Open this HTTPS URL in your browser. Enter a display name and a Room ID (e.g., `room1`). Allow camera and microphone permissions.
5. **On your mobile phone**: Open the **same HTTPS URL** in your mobile browser. Enter a different display name but the **same Room ID** (`room1`). Allow camera and microphone permissions.

Once both devices have joined the same room, the video call and chat will connect natively peer-to-peer!
