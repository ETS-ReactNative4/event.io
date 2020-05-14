import React, { useState, createContext, useContext, useEffect } from 'react'
import _ from 'lodash'

export const PostContext = createContext({
  feeds: null,
  setFeeds: feeds => {},
  posts: null,
  setPosts: posts => {},
  profiles: null,
  setProfiles: profiles => {}
})

export const PostProvider = props => {
  const [feeds, setFeeds] = useState(null)
  const [posts, setPosts] = useState({})
  const [profiles, setProfiles] = useState(null)

  async function getPosts(feedId, postId) {
    try {
      if (!posts) return await fetchPosts(feedId, postId)
      const post = posts[postId]
      if (!post) {
        return await fetchPosts(feedId, postId)
      } else {
        const out = {}
        for (let commentId of post.comments) {
          const comment = posts[commentId]
          if (!comment) {
            return await fetchPosts(feedId, postId)
          } else {
            out[comment._id] = comment
          }
          return { post, comments: out }
        }
      }
    } catch (err) {
      console.log('Error:getPosts', err)
      return null
    }
  }

  async function fetchPosts(feedId, postId) {
    try {
      const res = await auth.get(`/feed/${feedId}/${postId}`)
      if (res.ok) {
        const data = await res.json()
        posts[data.post._id] = data.post
        if (data.comments && data.comments.length > 0)
          for (let post of data.comments) {
            posts[post._id] = post
          }
        setPosts(posts)
        return data
      } else {
        console.log(
          'Error::PostContext::fetchPosts\nError fetching post from server',
          res
        )
        return null
      }
    } catch (err) {
      console.log(err)
      return null
    }
  }

  async function createPost(feedId, body, postId) {
    try {
      const url = postId ? `/feed/${feedId}/${postId}` : `/feed/${feedId}`
      const res = await auth.get(url, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      if (res.ok) {
        const data = await res.json()
        if (!postId) {
          feeds[data.feed._id] = data.feed
          posts[data.post._id] = data.post
          setFeeds({ ...feeds })
          setPosts({ ...posts })
        } else {
          posts[data.post._id] = data.post
          posts[data.parent._id] = data.parent
          setPosts({ ...posts })
        }
        console.log('createPost:', JSON.stringify(data, null, 2))
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
        return data
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
      console.log('fetchProfile:', JSON.stringify(data, null, 2))
      if (data.posts) {
        for (let post of data.posts) {
          posts[post._id] = post
        }
        setPosts({ ...posts })
        setProfiles({ ...profiles, [id]: data })
      }
      return data
    } catch (err) {
      console.log('Error::PostContext::fetchProfile', err)
      return null
    }
  }

  return (
    <PostContext.Provider
      value={{
        feeds,
        setFeeds,
        posts,
        setPosts,
        profiles,
        setProfiles
      }}
    >
      {props.children}
    </PostContext.Provider>
  )
}

export const PostConsumer = PostContext.Consumer
