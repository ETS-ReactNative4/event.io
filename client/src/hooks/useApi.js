import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import join from 'url-join'
import { appconfig } from '../appconfig'

export function useApi() {
  const authctx = useContext(AuthContext)
  const baseurl = appconfig.BACKEND_URL

  const get = async (endpoint, options = {}) => {
    if (authctx.token) {
      options.headers.Authorization = `Bearer ${token}`
    }
    if (authctx.socket) {
      options.headers.sid = authctx.socket.id
    }
    const url = join(baseurl, endpoint)
    const res = await fetch(url, options)
    console.log('AuthContext::get::', url)
    return res
  }

  const post = async (endpoint, body) => {
    const url = join(baseurl, endpoint)
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    if (authctx.token) {
      options.headers.Authorization = `Bearer ${token}`
    }
    const res = await fetch(url, options)
    return res
  }

  return { get, post }
}
