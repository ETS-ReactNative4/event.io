import React from 'react'
import PostHeader from './PostHeader'
import PostOptions from './PostOptions'
import { View, StyleSheet, Text } from 'react-native'

export default function BasePost({
  post,
  comments,
  onLike,
  onComment,
  onReply,
  likeToggle,
  commentToggle
}) {
  return (
    <View style={styles.container}>
      <PostHeader username={post.user.username} date={post.createdAt} />
      <Text style={styles.body}>{post.body}</Text>
      <PostOptions
        comments={comments}
        post={post}
        onLike={onLike}
        like={likeToggle}
        commentToggle={commentToggle}
        onComment={onComment}
        onReply={onReply}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 12
  },
  body: { fontSize: 14, paddingVertical: 3 }
})
