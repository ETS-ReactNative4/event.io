import React from 'react'
import { View, Text, FlatList } from 'react-native'
import PostListItemContainer from './PostListItemContainer'

export default React.memo(PostList)

function PostList(props) {
  const EmptyList = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 12,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>This feed has no posts.</Text>
      </View>
    )
  }
  console.log('PostList::render')
  return (
    <FlatList
      {...props}
      ListEmptyComponent={EmptyList()}
      data={props.posts}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <PostListItemContainer id={item} />}
    />
  )
}
