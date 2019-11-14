import React, { useEffect, useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { PostContext } from '../context/PostContext'
import { withNavigation } from 'react-navigation'
import PostListItem from './PostListItem'

export default withNavigation(PostListItemContainer)
function PostListItemContainer({
  navigation,
  postId,
  feedId,
  showAvatar,
  showOptions
}) {
  const { posts, fetchPosts, setLikePost } = useContext(PostContext)
  const post = posts && posts[postId]
  useEffect(() => fetchPosts(postId, feedId), [])

  return (
    <>
      {post ? (
        <PostListItem
          showOptions={showOptions}
          showAvatar={showAvatar}
          post={post}
          onLike={like => setLikePost(postId, like)}
          onReply={() => navigation.push('Post', { post: post })}
        />
      ) : (
        <View style={{ padding: 12, justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      )}
    </>
  )
}
