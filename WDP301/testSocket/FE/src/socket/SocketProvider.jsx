import React, { createContext, useContext, useMemo, useRef, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext({ socket: null, connect: () => {}, disconnect: () => {} })

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const currentUrl = useRef(null)

  const connect = (url) => {
    const target = (url || '').trim()
    if (!target) return
    if (socket?.connected && currentUrl.current === target) return

    if (socket) {
      try { socket.disconnect() } catch {}
    }

    const s = io(target, { transports: ['websocket', 'polling'] })
    setSocket(s)
    currentUrl.current = target
  }

  const disconnect = () => {
    if (socket) socket.disconnect()
  }

  const value = useMemo(() => ({ socket, connect, disconnect }), [socket])
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export function useSocket() {
  return useContext(SocketContext)
}
