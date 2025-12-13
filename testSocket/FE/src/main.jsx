import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { SocketProvider } from './socket/SocketProvider'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <App />
  </SocketProvider>
)
