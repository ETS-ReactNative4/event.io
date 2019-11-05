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
import BaseMutilineTextInput from '../components/BaseMultilineTextInput';

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
  return <View></View>;
};

const CommentSection = ({ comments }) => {
  return (
    <View
      style={{ borderTopWidth: 1, borderTopColor: 'lightgray', marginTop: 6 }}>
      {comments ? (
        <FlatList
          data={comments}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <Comment comment={item} />}
        />
      ) : (
        <Text style={{ color: 'lightgray' }}>No Comments</Text>
      )}
    </View>
  );
};

const PostOptions = ({ post, navigation, setPost }) => {
  const [comment, setComment] = useState(false);
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
      {comment && <CommentSection comments={post.posts} />}
    </View>
  );
};

export default withNavigation(PostOptions);
