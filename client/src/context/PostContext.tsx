import React, { useState, createContext } from 'react'

export const PostContext = createContext({
  posts: {},
  setPosts: ({}) => {}
})

export const PostProvider = (props: any) => {
  const [posts, setPosts] = useState({})
  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts
      }}
    >
      {props.children}
    </PostContext.Provider>
  )
}

export const PostConsumer = PostContext.Consumer
