import { useContext } from 'react'
import { PostContext } from '../context/PostContext'
import { useApi } from '../hooks/useApi'
import { tryCatch } from '../util/err'

export default function usePosts() {
  const api = useApi()
  const postctx = useContext(PostContext)

  async function fetchHomePosts() {
    const [data, err] = await tryCatch(async () => {
      const res = await api.get('/home')
      homePosts = await res.json()
      const posts = postctx.posts
      for (let post of homePosts) {
        posts[post._id] = post
      }
      postctx.setPosts(posts)
      return homePosts
    })
    return data
  }

  async function fetchPosts(feedId, postId) {
    const [data, err] = await tryCatch(async () => {
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
      }
    })
    return data
  }

  async function setLike(postid, like) {
    const [data, err] = await tryCatch(async () => {
      const res = await api.post(`/posts/${postid}/likes`, { like })
      if (res.ok) {
        const data = await res.json()
        postctx.setPosts({ ...posts, [postid]: data })
        return data
      }
    })
    return data
  }

  async function createPost(feedId, body, postId) {
    const [data, err] = await tryCatch(async () => {
      const url = postId ? `/feed/${feedId}/${postId}` : `/feed/${feedId}`
      const res = await api.post(url, body)
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
        return data
      }
    })
    return data
  }

  async function getPosts(feedId, postId) {
    const [data, err] = await tryCatch(async () => {
      if (!postctx.posts) {
        return await fetchPosts(feedId, postId)
      }
      const post = postctx.posts[postId]
      if (!post) {
        return await fetchPosts(feedId, postId)
      } else {
        const out = {}
        for (let commentId of post.comments) {
          const comment = postctx.posts[commentId]
          if (!comment) {
            return await fetchPosts(feedId, postId)
          } else {
            out[comment._id] = comment
          }
          return { post, comments: out }
        }
      }
    })
    return data
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

  return { fetchHomePosts, fetchFeedById }
}
