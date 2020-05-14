import { useContext } from 'react'
import { PostContext } from '../context/PostContext'
import Geolocation from '@react-native-community/geolocation'
import { useApi } from '../hooks/useApi'

export default function usePosts() {
  const api = useApi()
  const postctx = useContext(PostContext)

  async function fetchHomePosts() {
    try {
      const res = await api.get('/home')
      const homePosts = await res.json()
      const posts = postctx.posts
      // cache could lead to mem leak
      for (let post of homePosts) {
        posts[post._id] = post
      }
      postctx.setPosts(posts)
      return homePosts
    } catch (err) {
      console.log('Error:fetchHome', err)
      return null
    }
  }

  // maybe different ctx
  async function createFeed(feed) {
    try {
      Geolocation.getCurrentPosition(
        async pos => {
          const { audience, title, description } = feed
          const location = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
          const res = await api.post('/feed', {
            title,
            description,
            audience,
            location
          })
          if (res.ok) {
            const createdFeed = await res.json()
            postctx.setFeeds({ [createdFeed._id]: createdFeed, ...feeds })
            return createdFeed
          } else {
            console.log(
              'Error creating feed. Server responded with status code',
              res.code
            )
            return null
          }
        },
        err => {
          console.log('Geolocation error in createFeed', err)
          return null
        }
      )
    } catch (err) {
      console.log('Error::PostContext::createFeed', err)
      return null
    }
  }

  async function fetchFeeds() {
    try {
      const res = await api.get('/feed')
      if (res.ok) {
        const data = await res.json()
        const newFeeds = {}
        for (const feed of data) {
          newFeeds[feed._id] = feed
        }
        postctx.setFeeds(newFeeds)
        return data
      }
    } catch (err) {
      console.log('Error::PostContext::fetchFeed', err)
      return null
    }
  }

  async function fetchFeedById(feedId) {
    try {
      const res = await api.get(`/feed/${feedId}`)
      if (res.ok) {
        const data = await res.json()
        const newPosts = {}
        for (let post of data.posts) {
          newPosts[post._id] = post
        }
        postctx.setPosts({ ...postctx.posts, ...newPosts })
        return data
      } else {
        console.log(
          'Error::PostContext::fetchFeed\nError fetching feed from server'
        )
        return null
      }
    } catch (err) {
      console.log(err)
      return null
    }
  }

  return { fetchHomePosts, fetchFeeds, fetchFeedById }
}
