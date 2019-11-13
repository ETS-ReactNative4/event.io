import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, View } from 'react-native'
import PostListItem from './PostListItem'
import { withNavigation } from 'react-navigation'
import { PostContext } from '../context/PostContext'

export default function PostListItemContainer({ id, navigation, showAvatar, showOptions }) {
  console.log('PostListItemContainer::render')
  const { posts, setLikePost, fetchComments } = useContext(PostContext)
  const [comments, setComments] = useState()
  const post = posts ? posts[id] : null

  function onReply() {
    navigation.push('Post', { post })
  }
  return (
    <>
      {post ? (
        <PostListItem
          showOptions={showOptions}
          showAvatar={showAvatar}
          post={post}
          comments={comments}
          onLike={like => setLikePost(post._id, like)}
          onReply={onReply}
        />
      ) : (
        <View style={{ padding: 12, justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      )}
    </>
  )
}
