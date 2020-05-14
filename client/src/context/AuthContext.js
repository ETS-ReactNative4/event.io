import React, { useState } from 'react'

import React, { useState, createContext } from 'react'

export const AuthContext = createContext({
  user: null,
  setUser: user => {},
  token: null,
  setToken: token => {},
  socket: null,
  setSocket: socket => {}
})

export function AuthProvider() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [socket, setSocket] = useState(null)

  return (
    <AuthContext.Provider
      value={(user, token, socket, setToken, setUser, setSocket)}
    >
      {this.props.children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer
