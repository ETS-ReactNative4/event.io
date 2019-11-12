import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import BasePost from './BasePost'
import { PostContext } from '../context/PostContext'

export default function CommentItem({ comment }) {
  const [replyToggle, setReplyToggle] = useState()
  const [likeToggle, setLikeToggle] = useState()
  const postCtx = useContext(PostContext)

  useEffect(() => {

  }, [])

  function onReply() {}
  function onComment() {}
  function onLike() {}

  return (
    <BasePost 
      likeToggle={likeToggle} 
      commentToggle={replyToggle} 
      onReply={onReply}/>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f0f8ff'
  }
})
