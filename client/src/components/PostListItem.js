import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import PostOptions from '../components/PostOptions';
import Avatar from '../components/Avatar';
import Moment from 'react-moment';
import 'moment-timezone';
import { withNavigation } from 'react-navigation';
const highlightColor = '#eee';

const PostListItem = props => {
  const [post, setPost] = useState(props.post);

  function setPostLink(data) {
    setPost(data);
  }

  return (
    <TouchableHighlight underlayColor={highlightColor} onPress={() => {}}>
      {post && (
        <View style={styles.container}>
          <Avatar
            rounded={true}
            style={styles.picture}
            user={post.author}
            size={48}
          />
          <View style={{ flex: 1 }}>
            <View style={styles.header}>
              <Text style={styles.title}>{post.author.username}</Text>
              <Moment
                fromNow
                element={Text}
                style={{ color: 'gray', fontSize: 12 }}>
                {post.createdAt}
              </Moment>
            </View>
            <Text style={styles.body}>{post.body}</Text>
            <PostOptions post={post} setPost={setPost} />
          </View>
        </View>
      )}
    </TouchableHighlight>
  );
};
export default withNavigation(PostListItem);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    flexDirection: 'row',
    borderTopColor: 'lightgray',
    paddingVertical: 12,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
  },
  title: {
    flex: 1,
    fontSize: 16,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  picture: { marginRight: 12 },
  body: { fontSize: 16 },
  author: { marginRight: 12 },
});
