import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Text,
  FlatList,
} from 'react-native';
import Icon from '../components/Icon';
import { withNavigation } from 'react-navigation';
import Like from '../components/Like';
import { AuthContext } from '../context/AuthContext';
import PostListItem from '../components/PostListItem';

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingVertical: 3,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 48,
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
    color: 'gray',
  },
  counter: {
    fontWeight: 'bold',
    marginLeft: 3,
  },
});

const Comment = ({ comment }) => {
  return <PostListItem post={comment} />;
};

const CommentSection = ({ comments }) => {
  return (
    <View
      style={{ borderTopWidth: 1, borderTopColor: 'lightgray', marginTop: 6 }}>
      {comments ? (
        comments.map(post => <PostListItem post={post} />)
      ) : (
        <Text style={{ color: 'lightgray' }}>No Comments</Text>
      )}
    </View>
  );
};

const PostOptions = ({ post, navigation, setPost }) => {
  const [comment, setComment] = useState(false);
  const [comments, setComments] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    getComments();
  }, []);

  async function getComments() {
    const res = await auth.get(`/posts/${post._id}/comments`);
    const comments = await res.json();
    console.log('comments', JSON.stringify(comments, null, 2));
    setComments(comments.posts);
  }

  const commentIconStyle = comment
    ? { color: '#428bca' }
    : { color: styles.icon.color };

  function toggleCommentSection() {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity,
      ),
    );
    setComment(!comment);
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Like post={post} setPost={setPost} />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={toggleCommentSection}>
            <Icon style={[styles.icon, commentIconStyle]} name="chatbubbles" />
          </TouchableOpacity>
          <Text style={styles.counter}>{post.posts.length}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.push('Post', { post })}>
            <Icon style={[styles.icon]} name="create" />
          </TouchableOpacity>
        </View>
      </View>
      {comment && <CommentSection comments={comments} />}
    </View>
  );
};

export default withNavigation(PostOptions);
