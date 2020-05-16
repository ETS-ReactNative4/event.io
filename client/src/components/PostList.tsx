import React from 'react'
import { View, Text, FlatList } from 'react-native'
import PostListItem from './PostListItem'

export default function PostList({ feed, posts }) {
  const reversed = [...posts].reverse()
  const EmptyList = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 32,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>This feed has no posts.</Text>
      </View>
    )
  }
  return (
    feed.posts && (
      <FlatList
        ListEmptyComponent={<EmptyList />}
        data={reversed}
        keyExtractor={item => {
          return item
        }}
        renderItem={({ item }) => (
          <PostListItem postId={item} feedId={feed._id} />
        )}
      />
    )
  )
}
