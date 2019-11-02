import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Text,
} from 'react-native';
import Icon from '../components/Icon';
import BaseMutilineTextInput from '../components/BaseMultilineTextInput';
import { AuthContext } from '../context/AuthContext';

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingVertical: 3,
  },
  icon: {
    marginRight: 22,
    fontSize: 24,
    color: 'gray',
  },
});

const Comment = ({ comment }) => {
  return <View></View>;
};

const CommentSection = ({ comments }) => {
  return (
    <View>
      {comments &&
        comments.map(el => {
          <Comment comment={el} />;
        })}
      <BaseMutilineTextInput placeholder="Write your comment here" />
    </View>
  );
};

export default PostOptions = ({ post }) => {
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState(false);
  const likeIconStyle = like ? { color: '#d9534f' } : { color: 'gray' };
  const commentIconStyle = comment ? { color: '#428bca' } : { color: 'gray' };
  const auth = useContext(AuthContext);

  useEffect(() => {
    console.log('component did mount');
    setLike(post.likes.includes(auth.user.uid));
  }, []);

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

  async function onLike() {
    const res = await auth.get(`/posts/${post._id}/likes`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ like: !like }),
    });
    const data = await res.json();
    setLike(!like);
  }

  return (
    <View style={styles.container}>
      <Text style={{ paddingVertical: 6, fontSize: 12, fontWeight: 'bold' }}>
        Likes {post.likes.length}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={onLike}>
          <Icon
            style={[styles.icon, likeIconStyle]}
            name={like ? 'heart' : 'heart'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCommentSection}>
          <Icon style={[styles.icon, commentIconStyle]} name="text" />
        </TouchableOpacity>
      </View>
      {comment && <CommentSection />}
    </View>
  );
};
