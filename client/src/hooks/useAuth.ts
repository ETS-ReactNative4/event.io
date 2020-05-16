import { useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { useApi } from './useApi'
import { AuthContext } from '../context/AuthContext'
import { appconfig } from '../appconfig'
import { Socket } from 'socket.io-client'

export function useAuth() {
  const authctx = useContext(AuthContext)
  const api = useApi()

  const removeStorageToken = async () => {
    try {
      await AsyncStorage.removeItem('token')
    } catch (err) {
      console.error('Error removing token from storage')
    }
  }

  const getStorageToken = async () => {
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

  const saveStorageToken = async (token: string) => {
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

  const loginWithToken = async () => {
    const token = await getStorageToken()
    const res = await api.post('/auth/token', { token })
    if (res.ok) {
      try {
        const data = await res.json()
        const socket = io(appconfig.BACKEND_URL)
        await saveStorageToken(data.token)
        socket.emit('authenticate', { token: data.token })
        authctx.setSocket(socket)
        authctx.setToken(data.token)
        authctx.setUser(data.user)
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    } else {
      return false
    }
  }

  const register = async (
    email: string,
    password: string,
    username: string
  ) => {
    const res = await api.post('/auth/register', { email, password, username })
    return res.ok
  }

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password })
    if (res.ok) {
      const data = await res.json()
      const success = await saveStorageToken(data.token)
      if (!success) {
        console.log('Error saving token')
        return false
      } else {
        const socket = io(appconfig.BACKEND_URL)
        socket.emit('authenticate', { token: data.token })
        authctx.setToken(data.token)
        authctx.setUser(data.user)
        return true
      }
    } else {
      console.log('Login failed', JSON.stringify(res, null, 2))
      return false
    }
  }

  const logout = async () => {
    authctx.socket.removeAllListeners()
    authctx.socket.disconnect()
    await removeStorageToken()
    authctx.setUser(null)
    authctx.setToken('')
    authctx.setSocket(Socket)
  }

  return { register, login, logout, loginWithToken }
}
