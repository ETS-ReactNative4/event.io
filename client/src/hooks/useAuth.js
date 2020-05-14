import { useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export function useAuth() {
  const ctx = useContext(AuthContext)

  const removeTokenFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('token')
    } catch (err) {
      console.error('Error removing token from storage')
    }
  }

  const getTokenFromStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      return token
    } catch (err) {
      console.log(
        'Error getting token from AsyncStorage',
        JSON.stringify(err, null, 2)
      )
      return null
    }
  }

  const saveTokenToStorage = async token => {
    try {
      await AsyncStorage.setItem('token', token)
      return true
    } catch (err) {
      console.log(
        'Error saving token to AsyncStorage',
        JSON.stringify(err, null, 2)
      )
      return false
    }
  }

  const refreshToken = async token => {
    const response = await fetch(`${baseUrl}/auth/refresh`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
    })
    if (response.ok) {
      try {
        const data = await response.json()
        await saveTokenToStorage(data.token)
        const socket = io(baseUrl)
        socket.emit('authenticate', { token: data.token })

        ctx.setState({
          token: data.token,
          user: data.user,
          socket
        })
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    } else {
      return false
    }
  }
  const login = async (email, password) => {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      const data = await res.json()
      const success = await saveTokenToStorage(data.token)
      if (!success) {
        console.log('Error saving token', error)
        return false
      } else {
        // logged in successfully now connect to socket
        const socket = io(baseUrl)
        socket.emit('authenticate', { token: data.token })
        this.setState({ token: data.token, user: data.user, socket })
        return true
      }
    } else {
      console.log('Login failed', JSON.stringify(res, null, 2))
      return false
    }
  }

  const logout = async () => {
    this.state.socket.removeAllListeners()
    this.state.socket.disconnect()
    await AsyncStorage.removeItem('token')
    this.setState({ token: null, user: null, socket: null })
  }
}
