import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import PostListItem from './PostListItem';
import { withNavigation } from 'react-navigation';
import { PostContext } from '../context/PostContext';

function PostListItemContainer({ post, navigation, showAvatar, showOptions }) {
  const { setLikePost } = useContext(PostContext);

  function onReply() {
    navigation.push('Post', { post });
  }

  return (
    <>
      {post ? (
        <PostListItem
          showOptions={showOptions}
          showAvatar={showAvatar}
          post={post}
          onLike={like => setLikePost(post._id, like)}
          onReply={onReply}
        />
      ) : (
        <View style={{ padding: 12, justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      )}
    </>
  );
}

export default React.memo(
  withNavigation(PostListItemContainer),
  (prevProps, nextProps) => {
    return (
      prevProps.post.likes.length === nextProps.post.likes.length &&
      prevProps.post.children === nextProps.post.children
    );
  },
);
