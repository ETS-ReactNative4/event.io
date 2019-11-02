import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PostOptions from '../components/PostOptions';
import Icon from '../components/Icon';

export default PostListItem = ({ post }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar
          rounded={true}
          style={styles.picture}
          user={post.author}
          size={48}
        />
        <Text style={styles.title}>{post.title}</Text>
        <View>
          <Text style={{ color: 'gray', fontSize: 12 }}>Edit</Text>
        </View>
      </View>
      <Text style={styles.body}>{post.body}</Text>
      <PostOptions post={post} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: 'lightgray',
    flex: 1,
    paddingVertical: 12,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
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
