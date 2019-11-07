import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
export const PostContext = React.createContext();

export const PostProvider = props => {
  const [posts, setPosts] = useState({});
  const auth = useContext(AuthContext);

  // cb(err, data)
  async function fetchPost(id) {
    try {
      const res = await auth.get(`/posts/${id}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // initial request then cache can have race conditions
  async function getPost(id) {
    let post = posts[id];
    if (post === null || post === undefined) {
      const post = await fetchPost(id);
      setPosts({ ...posts, [id]: post });
      return post;
    } else {
      return posts[id];
    }
  }

  function setPost(id, post) {
    setPosts({ ...posts, [id]: post });
  }

  return (
    <PostContext.Provider value={{ getPost, setPost, posts }}>
      {props.children}
    </PostContext.Provider>
  );
};

export const PostConsumer = PostContext.Consumer;
