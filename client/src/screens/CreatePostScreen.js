import React, { useState, useContext } from 'react'
import { Alert } from 'react-native'
import { PostContext } from '../context/PostContext'
import FeedInfo from '../components/FeedInfo'
import BasePostForm from '../components/BasePostForm'
import PostListItem from '../components/PostListItem'

CreatePostScreen.navigationOptions = {
  title: 'Create Post'
}
export default function CreatePostScreen({ navigation }) {
  const { createPost } = useContext(PostContext)
  const feed = navigation.getParam('feed', null)
  const post = navigation.getParam('post', null)

  const onSubmit = body => {
    if (!body) return Alert.alert('Posts cannot be empty')
    if (feed) {
      createPost(feed._id, { body })
      navigation.goBack()
    } else if (post) {
      createPost(post.feed, { body }, post._id)
      navigation.goBack()
    }
  }

  return (
    <BasePostForm onSubmit={onSubmit}>
      {feed ? (
        <FeedInfo feed={feed} />
      ) : (
        <PostListItem postId={post._id} feedId={post.feed} />
      )}
    </BasePostForm>
  )
}
