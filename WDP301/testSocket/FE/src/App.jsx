import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSocket } from './socket/SocketProvider'
import VideoCall from './components/VideoCall'

export default function App() {
  const { socket, connect, disconnect } = useSocket()
  const [url, setUrl] = useState('http://localhost:3000')
  const [msg, setMsg] = useState('')
  const [log, setLog] = useState([])
  const logRef = useRef(null)

  const connected = !!(socket && socket.connected)

  // autoscroll
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [log])

  useEffect(() => {
    if (!socket) return

    const onConnect = () => addLog(`Connected with id ${socket.id}`, 'client')
    const onDisconnect = (reason) => addLog(`Disconnected: ${reason}`, 'client')
    const onConnectError = (err) => addLog(`Connect error: ${err.message}`, 'error')
    const onServerMessage = (payload) => addLog(typeof payload === 'string' ? payload : payload.text, 'server')
    const onChatMessage = (payload) => addLog(`${payload.id}: ${payload.text}`, 'chat')
    const onServerTime = (payload) => addLog(`Server time: ${new Date(payload.ts).toLocaleTimeString()}`, 'tick')

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('connect_error', onConnectError)
    socket.on('server_message', onServerMessage)
    socket.on('chat_message', onChatMessage)
    socket.on('server_time', onServerTime)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('connect_error', onConnectError)
      socket.off('server_message', onServerMessage)
      socket.off('chat_message', onChatMessage)
      socket.off('server_time', onServerTime)
    }
  }, [socket])

  const addLog = (text, who = 'info') => {
    const t = new Date().toLocaleTimeString()
    setLog((prev) => [...prev, { t, who, text }])
  }

  const onSend = () => {
    const m = msg.trim()
    if (!m || !connected) return
    socket.emit('chat_message', m)
    setMsg('')
  }

  return (
    <div style={{ fontFamily: 'system-ui, Arial, sans-serif', margin: '2rem' }}>
      <h1>Socket.IO React Realtime Test</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
        <label htmlFor="serverUrl">Server URL:</label>
        <input id="serverUrl" size={40} value={url} onChange={(e) => setUrl(e.target.value)} />
        <button onClick={() => connect(url)} disabled={connected}>Connect</button>
        <button onClick={disconnect} disabled={!connected}>Disconnect</button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
          placeholder="Type message and press Send or Enter"
          style={{ flex: 1 }}
        />
        <button onClick={onSend} disabled={!connected}>Send</button>
      </div>

      <div
        ref={logRef}
        style={{ border: '1px solid #ccc', padding: 8, height: 300, overflow: 'auto', background: '#fafafa' }}
      >
        {log.map((m, idx) => (
          <div key={idx} className="msg">
            <time style={{ color: '#777', fontSize: '0.8rem', marginRight: 8 }}>[{m.t}]</time>
            <span className="who" style={{ fontWeight: 600 }}>{m.who}:</span> {m.text}
          </div>
        ))}
      </div>

      <VideoCall />
    </div>
  )
}
