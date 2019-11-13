import React, { useState, useContext, useEffect, useReducer } from 'react'
import { AuthContext } from './AuthContext'
import Geolocation from '@react-native-community/geolocation'
import _ from 'lodash'

export const PostContext = React.createContext()

export const PostProvider = props => {
  // state
  const [feeds, setFeeds] = useState(null)
  const [posts, setPosts] = useState(null)
  const [comments, setComments] = useState({})
  const [profiles, setProfiles] = useState({})

  // context
  const auth = useContext(AuthContext)

  // Comments
  async function getComments(postId) {
    const post = posts[postId]
    if (post && post.comments) {
      const out = []
      for (let commentId of post.comments) {
        const comment = comments[commentId]
        if (comment) {
          out.push(comment)
        } else {
          return await fetchComments(postId)
        }
      }
      return out
    } else {
      return await fetchComments(postId)
    }
  }

  async function fetchComments(postId) {
    try {
      const res = await auth.get(`/posts/${postId}`)
      if (res.ok) {
        const data = await res.json()
        const cache = {}
        for (let comment of data) {
          cache[comment._id] = comment
        }
        setComments({ ...comments, ...cache })
        return data
      }
    } catch (err) {
      console.log(err)
      return null
    }
  }

  async function createComment(postId, comment) {
    try {
      const res = await auth.get(`/posts/${postId}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(comment)
      })
      if (res.ok) {
        const data = await res.json()
        setPosts({ ...posts, [data._id]: data })
        return data
      } else {
        console.log('Error creating comment', JSON.stringify(res, null, 2))
        return null
      }
    } catch (err) {
      console.log(err)
      return null
    }
  }

  // FEEDS fetch -> create
  async function getFeeds() {
    if (feeds) {
      return feeds
    } else {
      const _feeds = await fetchFeeds()
      return _feeds
    }
  }

  async function fetchFeeds() {
    try {
      const res = await auth.get('/feed')
      if (res.ok) {
        const data = await res.json()
        const newFeeds = {}
        for (const feed of data) {
          newFeeds[feed._id] = feed
        }
        setFeeds(newFeeds)
        return data
      }
    } catch (err) {
      console.log('Error::PostContext::fetchFeed', err)
      return null
    }
  }

  async function createFeed(feed) {
    try {
      Geolocation.getCurrentPosition(
        async pos => {
          const { audience, title, description } = feed
          const location = {
            latitude: pos.coords.latitude + (Math.random() - 0.5) * 0.005,
            longitude: pos.coords.longitude + (Math.random() - 0.5) * 0.005
          }
          const res = await auth.get('/feed', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, audience, location })
          })
          if (res.ok) {
            const createdFeed = await res.json()
            const updatedFeeds = [...feeds]
            updatedFeeds.push(createdFeed)
            setFeeds(updatedFeeds)
            return createdFeed
          } else {
            console.log('Error creating feed. Server responded with status code', res)
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

  // Posts => fetch -> get -> create
  async function fetchPosts(feedId) {
    try {
      const res = await auth.get(`/feed/${feedId}`)
      if (res.ok) {
        const data = await res.json()
        const newPosts = {}
        for (let post of data.posts) {
          newPosts[post._id] = post
        }
        // check for null
        if (posts) {
          setPosts({ ...posts, ...newPosts })
        } else {
          setPosts({ ...newPosts })
        }
        return data
      } else {
        console.log('Error::PostContext::fetchPosts\nError fetching post from server')
        return null
      }
    } catch (err) {
      console.log(err)
      return null
    }
  }

  // returns all posts from a feed.
  async function getPosts(feedId) {
    async function defaultToFetch() {
      console.log('PostContext:getPosts:defaulting to fetch')
      const fetchedData = await fetchPosts(feedId)
      return fetchedData
    }
    const feed = feeds[feedId]
    if (!feed) {
      console.log('Error:PostContext:getPosts: attempting to access posts from non existant feed')
      return null
    } else {
      const feedPosts = []
      for (postId of feed.posts) {
        if (!posts) {
          return await defaultToFetch()
        }
        const post = posts[postId]
        if (!post) {
          return await defaultToFetch()
        } else {
          feedPosts.push(post)
        }
      }
      return { feed, posts: feedPosts }
    }
  }

  async function createPost(feedId, post) {
    try {
      const res = await auth.get(`/feed/${feedId}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(post)
      })
      if (res.ok) {
        // return supdated feed
        const data = await res.json()
        setFeeds({ ...feeds, [data.feed._id]: data.feed })
        setPosts({ ...posts, [data.post._id]: data.post })
        console.log(data)
        return data
      } else {
        console.log('Error creating post.', res)
        return null
      }
    } catch (err) {
      console.log(err)
      return null
    }
  }

  // Like a post
  async function setLikePost(id, like) {
    try {
      const res = await auth.get(`/posts/${id}/likes`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ like })
      })
      if (res.ok) {
        const data = await res.json()
        setPosts({ ...posts, [id]: data })
      } else {
        console.log('error posting like to server', res)
      }
    } catch (err) {
      console.log(err)
    }
  }
  // Profiles

  async function getProfile(id) {
    try {
      if (!profiles[id]) {
        try {
          const profile = await fetchProfile(id)
          return profile
        } catch (err) {
          return profiles[id]
        }
      } else {
        return profiles[id]
      }
    } catch (err) {
      console.log('Error::PostContext::getProfile', err)
      return null
    }
  }

  async function fetchProfile(id) {
    try {
      const res = await auth.get(`/profile/${id}`)
      const data = await res.json()
      for (let post of data.posts) {
        setPost(post._id, post)
      }
      setProfiles({ ...profiles, [id]: data })
      return data
    } catch (err) {
      console.log('Error::PostContext::fetchProfile', err)
      return null
    }
  }

  return (
    <PostContext.Provider
      value={{
        // comments
        fetchComments,
        createComment,
        // feeds
        feeds,
        getFeeds,
        fetchFeeds,
        createFeed,
        // posts
        posts,
        getPosts,
        fetchPosts,
        createPost,
        setLikePost,
        // profile
        profiles,
        fetchProfile,
        getProfile,
        setProfiles
      }}
    >
      {props.children}
    </PostContext.Provider>
  )
}

export const PostConsumer = PostContext.Consumer
