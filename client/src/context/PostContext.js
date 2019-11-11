import React, { useState, useContext, useEffect, useReducer } from 'react';
import { AuthContext } from './AuthContext';
import Geolocation from '@react-native-community/geolocation';

export const PostContext = React.createContext();
export const PostProvider = props => {
  const [feeds, setFeeds] = useState([]);
  const [posts, setPosts] = useState({});
  const [profiles, setProfiles] = useState({});
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.user) {
      fetchFeeds();
      fetchProfile(auth.user.uid);
    }
  }, [auth.user]);

  async function createComment(postId, comment) {
    try {
      const res = await auth.get('/feed/');
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async function createPost(feedId, post) {
    try {
      const res = await auth.get(`/feed/${feedId}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      if (res.ok) {
        // return supdated feed
        const data = await res.json();
        return data;
      } else {
        console.log('Error creating post.', res);
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async function createFeed(feed) {
    try {
      Geolocation.getCurrentPosition(
        async pos => {
          const { audience, title, description } = feed;
          const location = {
            latitude: pos.coords.latitude + (Math.random() - 0.5) * 0.005,
            longitude: pos.coords.longitude + (Math.random() - 0.5) * 0.005,
          };
          const res = await auth.get('/feed', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, audience, location }),
          });
          if (res.ok) {
            const createdFeed = await res.json();
            const updatedFeeds = [...feeds];
            updatedFeeds.push(createdFeed);
            setFeeds(updatedFeeds);
            return createdFeed;
          } else {
            console.log(
              'Error creating feed. Server responded with status code',
              res,
            );
            return null;
          }
        },
        err => {
          console.log('Geolocation error in createFeed', err);
          return null;
        },
      );
    } catch (err) {
      console.log('Error::PostContext::createFeed', err);
      return null;
    }
  }
  // whole data set.
  async function fetchFeeds() {
    try {
      const res = await auth.get('/feed');
      if (res.ok) {
        const data = await res.json();
        setFeeds(data);
        //cacheFeeds(data);
        return data;
      }
    } catch (err) {
      console.log('Error::PostContext::fetchFeed', err);
      return null;
    }
  }
  function cacheFeeds(feeds) {
    const out = {};
    for (let feed of feeds) {
      out[feed._id] = feed;
    }
    setFeeds(out);
  }

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
        feeds,
        fetchFeeds,
        createFeed,
        createPost,
        posts,
        getPost,
        getPostChildren,
        setPosts: setPosts.bind(this),
        setPost,
        fetchProfile,
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
