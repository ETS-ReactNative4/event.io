import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import BasePost from './BasePost'
import { PostContext } from '../context/PostContext'

export default function CommentItem({ comment }) {
  const [replyToggle, setReplyToggle] = useState()
  const [likeToggle, setLikeToggle] = useState()
  const postCtx = useContext(PostContext)

  function onReply() {}
  function onComment() {}
  function onLike() {}

  return (
    <BasePost
      post={comment}
      likeToggle={likeToggle}
      commentToggle={replyToggle}
      onReply={onReply}
    />
  )
}
