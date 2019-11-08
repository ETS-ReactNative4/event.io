import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
export const PostContext = React.createContext();

export const PostProvider = props => {
  const [initialized, setInitialized] = useState(false);
  const [posts, setPosts] = useState({});
  const [feed, setFeed] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const auth = useContext(AuthContext);

  // cb(err, data)
  useEffect(() => {
    if (auth.user) {
      const feed = fetchFeed();
      const profile = fetchProfile(auth.user.uid);
      Promise.all([feed, profile]).then(vals => {
        setInitialized(true);
      });
    }
  }, [auth.user]);

  async function refresh(id) {
    await fetchFeed();
    await fetchProfile(id);
  }

  async function getProfile(id) {
    try {
      if (!profiles[id]) {
        const profile = await fetchProfile(id);
        return profile;
      } else {
        return profiles[id];
      }
    } catch (err) {
      console.log('Error::PostContext::getProfile', err);
      return null;
    }
  }

  async function fetchProfile(id) {
    try {
      const res = await auth.get(`/profile/${id}`);
      const data = await res.json();
      for (let post of data.posts) {
        setPost(post._id, post);
      }
      setProfiles({ ...profiles, [id]: data });
      console.log('finished fetching data');
      return data;
    } catch (err) {
      console.log('Error::PostContext::fetchProfile', err);
      return null;
    }
  }

  async function fetchFeed() {
    try {
      const res = await auth.get('/feed');
      const data = await res.json();
      for (let post of data) {
        setPosts({ ...posts, [data._id]: post });
      }
      setFeed(data);
      return data;
    } catch (err) {
      console.log('Error::PostContext::fetchFeed', err);
      return null;
    }
  }

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
    console.log('initail post', post);
    if (post === null || post === undefined) {
      const post = await fetchPost(id);
      setPost(id, post);
      return post;
    } else {
      return posts[id];
    }
  }

  function setPost(id, post) {
    let currentPosts = { ...posts };
    currentPosts[id] = post;
    setPosts(currentPosts);
  }

  return (
    <PostContext.Provider
      value={{
        getPost,
        getProfile,
        feed,
        setPost,
        posts,
        refresh,
        initialized,
      }}>
      {props.children}
    </PostContext.Provider>
  );
};

export const PostConsumer = PostContext.Consumer;
