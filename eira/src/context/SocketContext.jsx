import SocketIO from

'socket.io-client'
import { createContext } from "react"

export const socket = SocketIO('http://localhost:2020', {
    transport: ['websocket']
})

export const SocketContext = createContext(socket)