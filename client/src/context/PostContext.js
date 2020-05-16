import React, { useState, createContext, useContext, useEffect } from 'react'
import _ from 'lodash'

export const PostContext = createContext({
  posts: null,
  setPosts: posts => {}
})

export const PostProvider = props => {
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
