import { useApi } from './useApi'
import { useContext } from 'react'
import { ProfilesContext } from '../context/ProfileContext'
import { PostContext } from '../context/PostContext'

export default function useProfiles() {
  const api = useApi()
  const profilesctx = useContext(ProfilesContext)
  const postsctx = useContext(PostContext)

  async function getProfileById(id) {
    try {
      const cached = profilesctx.profiles[id]
      if (!cached) {
        try {
          const profile = await fetchProfileById(id)
          return profile
        } catch (err) {
          console.log(err)
          return null
        }
      } else {
        return cached
      }
    } catch (err) {
      console.log(err)
      return null
    }
  }

  async function fetchProfileById(id) {
    try {
      const res = await api.get(`/profile/${id}`)
      const data = await res.json()
      if (data.posts) {
        const posts = {}
        for (let post of data.posts) {
          posts[post._id] = post
        }
        // duplicate info
        postsctx.setPosts({ ...postsctx.posts, ...posts })
        profilesctx.setProfiles({ ...profilectx.profiles, [id]: data })
      }
      return data
    } catch (err) {
      console.log(err)
      return null
    }
  }

  return { getProfileById }
}
