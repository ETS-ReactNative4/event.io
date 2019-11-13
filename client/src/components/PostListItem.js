import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, View, LayoutAnimation, Text, ActivityIndicator } from 'react-native'
import Avatar from './Avatar'
import PostOptions from './PostOptions'
import PostListItemContainer from './PostListItemContainer'
import { AuthContext } from '../context/AuthContext'
import PostHeader from './PostHeader'
import BasePost from './BasePost'

const PostListItem = ({ post, comments, onLike, onReply }) => {
  const [commentToggle, setCommentToggle] = useState(false)
  const auth = useContext(AuthContext)
  const [likeToggle, setLikeToggle] = useState(post.likes.includes(auth.user.uid))

  function handleLike(like) {
    setLikeToggle(like)
    onLike(like)
  }

  async function handleOnComment() {
    if (!comments || comments.length === 0) return
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    )
    setCommentToggle(!commentToggle)
  }
  const content = (
    <React.Fragment>
      <View
        style={[
          styles.container,
          commentToggle ? { backgroundColor: '#eee' } : { backgroundColor: 'white' }
        ]}
      >
        <Avatar style={styles.avatar} user={post.user} size={48} />
        <BasePost
          post={post}
          comments={comments}
          onLike={handleLike}
          onComment={handleOnComment}
          onReply={onReply}
          likeToggle={likeToggle}
          commentToggle={commentToggle}
        />
      </View>

      {commentToggle && (
        <View>
          <View
            style={{
              marginLeft: 12,
              borderLeftWidth: 1,
              borderLeftColor: 'lightgray'
            }}
          >
            {comments.map(post => {
              return <BasePost post={post} />
            })}
          </View>
        </View>
      )}
    </React.Fragment>
  )
  return <React.Fragment>{post ? content : <ActivityIndicator />}</React.Fragment>
}
export default PostListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f8ff'
  },
  mainContent: {
    flex: 1,
    marginLeft: 12
  },
  body: { fontSize: 14, paddingVertical: 3 }
})
