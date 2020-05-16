import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import urlJoin from 'url-join'
import { appconfig } from '../appconfig'

export function useApi() {
  const { token, socket } = useContext(AuthContext)
  const baseurl = appconfig.BACKEND_URL

  const get = async (endpoint: string, options?: RequestInit) => {
    const headers: any = {}
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    if (socket) {
      headers['sid'] = socket.id
    }
    options && (options.headers = { ...options.headers, headers })
    const url = urlJoin(baseurl, endpoint)
    const res = await fetch(url, options || {})
    return res
  }

  const post = async (endpoint: string, body: Object) => {
    const url = urlJoin(baseurl, endpoint)
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    const res = await fetch(url, options)
    return res
  }

  return { get, post }
}
