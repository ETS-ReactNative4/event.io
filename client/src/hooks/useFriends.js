import { useContext } from 'react'
import { FriendsContext } from '../context/FriendsContext'
import { useApi } from './useApi'

export default function useFriends() {
  const friendsctx = useContext(FriendsContext)
  const api = useApi()

  async function fetchFriendRequests() {
    try {
      const res = await api.get('/friends/requests')
      const requests = await res.json()
      firendsctx.setFriendRequests(requests)
    } catch (err) {
      console.log(err)
    }
  }

  async function fetchFriends() {
    try {
      const res = await api.get('/friends')
      const data = await res.json()
      friendsctx.setFriends(data.friends)
    } catch (err) {
      console.log(err)
    }
  }

  return { fetchFriendRequests, fetchFriends }
}
