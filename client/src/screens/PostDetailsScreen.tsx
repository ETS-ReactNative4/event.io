import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import PageView from '../components/PageView';
import Avatar from '../components/Avatar';
import Moment from 'react-moment';
import 'moment-timezone';
import BaseMultilineTextInput from '../components/BaseMultilineTextInput';
import Like from '../components/Like';

const PostDetailsScreen = ({ navigation }) => {
  const [post, setPost] = useState(navigation.state.params.post);

  function emitSetPost(data) {
    setPost(data);
    navigation.state.params.setPost(data);
  }

  return (
    <ScrollView>
      {post && (
        <PageView>
          <View style={styles.container}>
            <Avatar rounded={true} user={post.author} size={64} />
            <View style={styles.content}>
              <View style={styles.title}>
                <Text style={styles.author}>{post.author.username}</Text>
                <Moment fromNow element={Text} style={styles.time}>
                  {post.createdAt}
                </Moment>
              </View>
              <Text style={styles.body}>{post.body}</Text>
              <Like post={post} setPost={emitSetPost} />
            </View>
          </View>
          {post.comments.map(comment => {
            <Text>I am a comment</Text>;
          })}
          <BaseMultilineTextInput placeholder="Enter Comment Here" />
        </PageView>
      )}
    </ScrollView>
  );
};

PostDetailsScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Stuff',
  };
};

export default PostDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  author: {
    fontSize: 22,
  },
  time: {
    color: 'gray',
    marginLeft: 'auto',
    fontSize: 12,
  },
  body: {
    fontSize: 16,
    marginBottom: 12,
  },
  content: {
    flex: 1,
    marginLeft: 24,
  },
});
