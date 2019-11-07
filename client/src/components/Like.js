import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import ToggleIcon from './ToggleIcon';
const Like = ({ post, onLike }) => {
  const auth = useContext(AuthContext);
  const like = post.likes.includes(auth.user ? auth.user.uid : null);

  return (
    <View style={styles.iconContainer}>
      <ToggleIcon
        active={like}
        onPress={() => onLike(!like)}
        activeColor="#d9534f"
        name="heart"
        style={styles.icon}
      />
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
