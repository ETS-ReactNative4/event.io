import { useContext } from 'react'
import { FriendsContext } from '../context/FriendsContext'
import { useApi } from './useApi'

export default function useFriends() {
  const cache = useContext(FriendsContext)
  const api = useApi()

  async function fetchFriendRequests() {
    try {
      const res = await api.get('/friends/requests')
      const requests = await res.json()
      cache.setFriendRequests(requests)
    } catch (err) {
      console.log(err)
    }
  }

  async function fetchFriends() {
    try {
      const res = await api.get('/friends')
      const data = await res.json()
      cache.setFriends(data.friends)
    } catch (err) {
      console.log(err)
    }
  }

  return { fetchFriendRequests, fetchFriends }
}
