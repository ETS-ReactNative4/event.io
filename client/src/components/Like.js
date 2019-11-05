import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';
import Icon from './Icon';

const Like = ({ post, setPost }) => {
  const auth = useContext(AuthContext);
  const like = post.likes.includes(auth.user ? auth.user.uid : null);
  const likeIconStyle = like ? { color: '#d9534f' } : { color: 'gray' };

  async function handleLikeChange() {
    try {
      const res = await auth.get(`/posts/${post._id}/likes`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ like: !like }),
      });
      const data = await res.json();
      setPost(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={handleLikeChange}>
        <Icon style={[styles.icon, likeIconStyle]} name="heart" />
      </TouchableOpacity>
      <Text style={styles.counter}>{post.likes.length}</Text>
    </View>
  );
};
export default Like;

const styles = {
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 64,
  },
  icon: {
    fontSize: 24,
    color: 'gray',
  },
  counter: {
    fontWeight: 'bold',
    marginLeft: 3,
  },
};
