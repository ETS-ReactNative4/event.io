import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  LayoutAnimation,
  Text,
  ActivityIndicator,
} from 'react-native';
import Moment from 'react-moment';
import 'moment-timezone';
import Avatar from '../components/Avatar';
import PostListItemOptions from './PostListItemOptions';
import PostListItemContainer from './PostListItemContainer';
import { PostContext } from '../context/PostContext';

const PostListItem = ({
  post,
  onLike,
  onReply,
  showAvatar = true,
  showOptions = true,
}) => {
  const [commentToggle, setCommentToggle] = useState(false);
  const { posts, getPostChildren } = useContext(PostContext);

  async function toggleCommentDisplay() {
    if (!post.children || post.children.length === 0) return;
    await getPostChildren(post._id);
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity,
      ),
    );
    setCommentToggle(!commentToggle);
  }

  const content = (
    <>
      <View
        style={[
          styles.container,
          commentToggle
            ? { backgroundColor: '#f0f6ff' }
            : { backgroundColor: 'white' },
        ]}>
        {showAvatar && (
          <Avatar style={styles.avatar} user={post.user} size={48} />
        )}
        <View style={[styles.mainContent, !showAvatar && { marginLeft: 0 }]}>
          <View style={styles.header}>
            <Text style={styles.title}>{post.user.username}</Text>
            <Moment
              fromNow
              element={Text}
              style={{ color: 'gray', fontSize: 12 }}>
              {post.createdAt}
            </Moment>
          </View>
          <Text style={styles.body}>{post.body}</Text>
          {showOptions && (
            <View style={{ marginTop: 12 }}>
              <PostListItemOptions
                post={post}
                onLike={onLike}
                commentToggle={commentToggle}
                onComment={toggleCommentDisplay}
                onReply={onReply}
              />
            </View>
          )}
        </View>
      </View>

      {commentToggle && (
        <View>
          {post.parent === null && (
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  paddingVertical: 12,
                  color: 'gray',
                  marginLeft: 18,
                }}>
                Comments
              </Text>
            </View>
          )}
          <View
            style={{
              marginLeft: 12,
              borderLeftWidth: 1,
              borderLeftColor: 'lightgray',
            }}>
            {post.children.map(post => {
              return (
                <PostListItemContainer showAvatar={false} post={posts[post]} />
              );
            })}
          </View>
        </View>
      )}
    </>
  );
  return <>{post ? content : <ActivityIndicator />}</>;
};
export default PostListItem;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f0f8ff',
  },
  avatar: {},
  mainContent: {
    flex: 1,
    marginLeft: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
  },
  title: {
    flex: 1,
    fontSize: 14,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  body: { fontSize: 14, borderBottomWidth: 1 },
});