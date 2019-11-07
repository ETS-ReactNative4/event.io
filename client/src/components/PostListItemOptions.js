import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  LayoutAnimation,
  ActivityIndicator,
  Text,
} from 'react-native';
import ToggleIcon from './ToggleIcon';
import { AuthContext } from '../context/AuthContext';
import PostListItemContainer from './PostListItemContainer';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PostListItemOptions = ({
  post,
  commentToggle,
  onComment,
  onLike,
  onReply,
}) => {
  const auth = useContext(AuthContext);
  const like = post.likes.includes(auth.user ? auth.user.uid : null);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
        <View style={styles.iconContainer}>
          <ToggleIcon
            disabled={post.children.length === 0}
            active={commentToggle}
            activeColor="#428bca"
            onPress={onComment}
            style={styles.icon}
            name="text"
          />
          <Text style={styles.counter}>{post.children.length}</Text>
        </View>
        <TouchableOpacity onPress={onReply}>
          <Text style={{ fontSize: 10 }}>Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PostListItemOptions;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 3,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 36,
    marginRight: 12,
  },
  icon: {
    fontSize: 22,
    color: 'gray',
  },
  counter: {
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 3,
  },
});
