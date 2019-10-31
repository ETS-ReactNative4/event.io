import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default PostListItem = ({ post }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{post.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginVertical: 12 },
  header: { flexDirection: 'row' },
  title: { fontSize: 18, marginBottom: 6 },
  body: { fontSize: 16 },
  author: {},
});
