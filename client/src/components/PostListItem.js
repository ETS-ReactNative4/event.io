import React, { useContext, useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  LayoutAnimation,
  ActivityIndicator
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { PostContext } from '../context/PostContext'
import { AuthContext } from '../context/AuthContext'
import Avatar from './Avatar'
import BasePost from './BasePost'

const PostListItem = withNavigation(
  ({ navigation, postId, feedId, showAvatar = true }) => {
    const postCtx = useContext(PostContext)
    const authCtx = useContext(AuthContext)
    const post = postCtx.posts && postCtx.posts[postId]
    const [comments, setComments] = useState()

    const [commentToggle, setCommentToggle] = useState(false)
    const [likeToggle, setLikeToggle] = useState(
      post && post.likes.includes(authCtx.user.uid)
    )

    useEffect(() => {
      postCtx.getPosts(feedId, postId).then(data =>
        //
        setComments(data.comments)
      )
    }, [])

    const onLike = like => {
      setLikeToggle(like)
      postCtx.setLikePost(postId, like)
    }
    const onReply = () => {
      if (post) {
        navigation.push('Post', { post: post })
      }
    }
    const onComment = () => {
      if (!post.comments || post.comments.length === 0) return
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
      <>
        {post && (
          <View
            style={[
              styles.container,
              commentToggle
                ? { backgroundColor: '#eee' }
                : { backgroundColor: 'white' }
            ]}
          >
            {showAvatar && (
              <Avatar style={styles.avatar} user={post.user} size={48} />
            )}
            <BasePost
              style={showAvatar && { marignLeft: 0 }}
              post={post}
              onLike={onLike}
              onComment={onComment}
              onReply={onReply}
              likeToggle={likeToggle}
              commentToggle={commentToggle}
            />
          </View>
        )}
        {commentToggle && (
          <View>
            <View style={styles.commentsContainer}>
              {post.comments.map(comment => {
                return (
                  <PostListItem
                    showAvatar={false}
                    postId={comment}
                    feedId={feedId}
                  />
                )
              })}
            </View>
          </View>
        )}
      </>
    )

    if (post) {
      return content
    } else {
      return (
        <View style={{ padding: 12 }}>
          <ActivityIndicator />
        </View>
      )
    }
  }
)
export default PostListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f8ff'
  },
  commentsContainer: {
    marginLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: 'lightgray'
  },
  mainContent: {
    flex: 1,
    marginLeft: 12
  },
  body: { fontSize: 14, paddingVertical: 3 }
})
