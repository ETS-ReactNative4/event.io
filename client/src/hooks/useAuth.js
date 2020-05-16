import { useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { useApi } from './useApi'
import { AuthContext } from '../context/AuthContext'
import { appconfig } from '../appconfig'

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

  const saveStorageToken = async token => {
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

  const loginWithToken = async token => {
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

  const register = async (email, password, username) => {
    const res = await api.post('/auth/register', { email, password, username })
    return res.ok
  }

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    if (res.ok) {
      const data = await res.json()
      const success = await saveStorageToken(data.token)
      if (!success) {
        console.log('Error saving token', error)
        return false
      } else {
        const socket = io(baseUrl)
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
    authctx.setToken(null)
    authctx.setSocket(null)
  }

  return { register, login, logout, loginWithToken }
}
