import React, { useEffect, useRef, useState } from 'react'
import { useSocket } from '../socket/SocketProvider'

// Minimal 1-to-1 video call using WebRTC with Socket.IO signaling
export default function VideoCall() {
  const { socket } = useSocket()
  const [roomId, setRoomId] = useState('room1')
  const [inRoom, setInRoom] = useState(false)
  const [peers, setPeers] = useState([])
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState([])
  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)
  const pcRef = useRef(null)
  const localStreamRef = useRef(null)
  const remoteIdRef = useRef(null)

  // Create RTCPeerConnection
  const logStatus = (m) => setStatus((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${m}`])

  const ensurePc = () => {
    if (pcRef.current) return pcRef.current
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:global.stun.twilio.com:3478'
          ]
        }
      ]
    })
    pc.onicecandidate = (e) => {
      if (e.candidate && remoteIdRef.current && socket?.connected) {
        socket.emit('webrtc_ice_candidate', { target: remoteIdRef.current, candidate: e.candidate })
      }
    }
    pc.ontrack = (e) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = e.streams[0]
      }
    }
    pc.onconnectionstatechange = () => {
      logStatus(`PeerConnection state: ${pc.connectionState}`)
      if (pc.connectionState === 'failed' || pc.connectionState === 'closed') {
        // Auto clean-up on failure/closed
        hangup()
      }
    }
    pc.oniceconnectionstatechange = () => {
      logStatus(`ICE state: ${pc.iceConnectionState}`)
    }
    pcRef.current = pc
    return pc
  }

  const startLocal = async () => {
    if (localStreamRef.current) return localStreamRef.current
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      localStreamRef.current = stream
      if (localVideoRef.current) localVideoRef.current.srcObject = stream
      return stream
    } catch (e) {
      logStatus(`Camera/Mic error: ${e?.name || 'Error'} - ${e?.message || e}`)
      throw e
    }
  }

  const stopLocal = () => {
    localStreamRef.current?.getTracks().forEach((t) => t.stop())
    localStreamRef.current = null
    if (localVideoRef.current) localVideoRef.current.srcObject = null
  }

  const callPeer = async (peerId) => {
    try {
      setBusy(true)
      logStatus(`Calling peer ${peerId} ...`)
      remoteIdRef.current = peerId
      const pc = ensurePc()
      const stream = await startLocal()
      stream.getTracks().forEach((t) => pc.addTrack(t, stream))
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)
      socket.emit('webrtc_offer', { target: peerId, sdp: offer })
    } catch (e) {
      console.error('callPeer error', e)
      logStatus(`Call error: ${e?.message || e}`)
      setBusy(false)
    }
  }

  const hangup = () => {
    try { pcRef.current?.getSenders().forEach((s) => s.track && s.track.stop()) } catch {}
    try { pcRef.current?.close() } catch {}
    pcRef.current = null
    remoteIdRef.current = null
    stopLocal()
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null
    setBusy(false)
  }

  // Socket signaling handlers
  useEffect(() => {
    if (!socket) return

    const onRoomJoined = ({ roomId: id, peers }) => {
      setInRoom(true)
      setPeers(peers)
    }
    const onPeerJoined = ({ id }) => setPeers((p) => Array.from(new Set([...p, id])))
    const onPeerLeft = ({ id }) => {
      setPeers((p) => p.filter((x) => x !== id))
      if (remoteIdRef.current === id) hangup()
    }

    const onOffer = async ({ from, sdp }) => {
      try {
        remoteIdRef.current = from
        const pc = ensurePc()
        const stream = await startLocal()
        stream.getTracks().forEach((t) => pc.addTrack(t, stream))
        await pc.setRemoteDescription(sdp)
        const answer = await pc.createAnswer()
        await pc.setLocalDescription(answer)
        socket.emit('webrtc_answer', { target: from, sdp: answer })
        setBusy(true)
        logStatus(`Answered offer from ${from}`)
      } catch (e) {
        console.error('onOffer error', e)
        logStatus(`Offer handling error: ${e?.message || e}`)
      }
    }

    const onAnswer = async ({ from, sdp }) => {
      try {
        await ensurePc().setRemoteDescription(sdp)
        logStatus(`Received answer from ${from}`)
      } catch (e) {
        console.error('onAnswer error', e)
        logStatus(`Answer handling error: ${e?.message || e}`)
      }
    }

    const onIce = async ({ from, candidate }) => {
      try {
        await ensurePc().addIceCandidate(candidate)
      } catch (e) {
        console.error('onIce error', e)
        logStatus(`ICE handling error: ${e?.message || e}`)
      }
    }

    socket.on('room_joined', onRoomJoined)
    socket.on('peer_joined', onPeerJoined)
    socket.on('peer_left', onPeerLeft)
    socket.on('webrtc_offer', onOffer)
    socket.on('webrtc_answer', onAnswer)
    socket.on('webrtc_ice_candidate', onIce)

    return () => {
      socket.off('room_joined', onRoomJoined)
      socket.off('peer_joined', onPeerJoined)
      socket.off('peer_left', onPeerLeft)
      socket.off('webrtc_offer', onOffer)
      socket.off('webrtc_answer', onAnswer)
      socket.off('webrtc_ice_candidate', onIce)
    }
  }, [socket])

  const join = async () => {
    if (!socket?.connected) return alert('Connect to the server first')
    socket.emit('join_room', { roomId })
    logStatus(`Joined room ${roomId}`)
  }

  const leave = () => {
    if (!socket?.connected) return
    socket.emit('leave_room')
    hangup()
    setInRoom(false)
    setPeers([])
  }

  return (
    <div style={{ marginTop: 24 }}>
      <h2>Video Call (WebRTC)</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Room ID" />
        <button onClick={join} disabled={!socket?.connected || inRoom}>Join</button>
        <button onClick={leave} disabled={!inRoom}>Leave</button>
        <button onClick={() => remoteIdRef.current && hangup()} disabled={!busy}>Hang Up</button>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div>
          <h4>Local</h4>
          <video ref={localVideoRef} playsInline muted autoPlay style={{ width: 320, background: '#000' }} />
        </div>
        <div>
          <h4>Remote</h4>
          <video ref={remoteVideoRef} playsInline autoPlay style={{ width: 320, background: '#000' }} />
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Peers in Room:</strong>
        {peers.length === 0 ? (
          <span> None</span>
        ) : (
          <ul>
            {peers.map((id) => (
              <li key={id}>
                {id}
                <button style={{ marginLeft: 8 }} onClick={() => callPeer(id)} disabled={busy}>
                  Call
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Status:</strong>
        {status.length === 0 ? (
          <span> None</span>
        ) : (
          <ul>
            {status.map((s, i) => (
              <li key={i} style={{ fontFamily: 'monospace' }}>{s}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
