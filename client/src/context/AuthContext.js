import React, { useState } from 'react'

const baseUrl = 'http://localhost:3000'

export const AuthContext = React.createContext()

export function AuthProvider() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [socket, setSocket] = useState(null)

  // authorized fetch request
  const get = async (url, options = {}) => {
    options.headers = options.headers
      ? (options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
          sid: socket.id
        })
      : (options.headers = {
          Authorization: `Bearer ${token}`,
          sid: state.socket.id
        })
    const res = await fetch(baseUrl + url, options)
    console.log('AuthContext::get::', url)
    return res
  }

  return (
    <AuthContext.Provider
      value={(user, token, socket, setToken, setUser, setSocket)}
    >
      {this.props.children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer
