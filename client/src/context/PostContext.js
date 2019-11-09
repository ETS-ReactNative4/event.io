import React, { useState, useContext, useEffect, useReducer } from 'react';
import { AuthContext } from './AuthContext';
export const PostContext = React.createContext();

export const PostProvider = props => {
  const [posts, setPosts] = useState({});
  const [feed, setFeed] = useState([]);
  const [profiles, setProfiles] = useState({});
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.user) {
      fetchFeed();
      fetchProfile(auth.user.uid);
    }
  }, [auth.user]);

  async function getProfile(id) {
    try {
      if (!profiles[id]) {
        try {
          const profile = await fetchProfile(id);
          return profile;
        } catch (err) {
          return profiles[id];
        }
      } else {
        return profiles[id];
      }
    } catch (err) {
      console.log('Error::PostContext::getProfile', err);
      return null;
    }
  }

  async function getPostChildren(id) {
    try {
      const post = posts[id];
      if (!post) return null;
      // we have post with id.
      let out = [];
      for (let childId of post.children) {
        const child = posts[childId];
        if (child) out.push(child);
        else {
          // send request to fetch children
          const res = await auth.get(`/posts/${id}/children`);
          const data = await res.json();
          for (let post of data) {
            setPost(post._id, post);
          }
          out = data;
          break;
        }
      }
      return out;
    } catch (err) {
      console.log(err);
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
        setPost(post._id, post);
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
    if (post === null || post === undefined) {
      const post = await fetchPost(id);
      setPost(id, post);
      return post;
    } else {
      return posts[id];
    }
  }

  async function setLikePost(id, like) {
    try {
      const res = await auth.get(`/posts/${id}/likes`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ like }),
      });
      if (res.ok) {
        const data = await res.json();
        setPost(id, data);
      } else {
        console.log('error posting like to server', res);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function setPost(id, post) {
    posts[id] = post;
    setPosts({ ...posts });
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        getPost,
        getPostChildren,
        setPosts: setPosts.bind(this),
        setPost,
        feed,
        fetchFeed,
        fetchProfile,
        setFeed: setFeed.bind(this),
        getProfile,
        profiles,
        setProfiles,
        setLikePost,
      }}>
      {props.children}
    </PostContext.Provider>
  );
};

export const PostConsumer = PostContext.Consumer;
