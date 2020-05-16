import React, { useState, createContext } from 'react'
import { Socket } from 'socket.io-client'

export const AuthContext = createContext({
  user: null,
  setUser: (user: any) => {},
  token: '',
  setToken: (token: string) => {},
  socket: Socket,
  setSocket: (socket: SocketIOClient.Socket) => {}
})

export function AuthProvider(props: any) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')
  const [socket, setSocket] = useState<SocketIOClient.Socket>(Socket)

  return (
    <AuthContext.Provider
      value={{ user, token, socket, setToken, setUser, setSocket }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer
