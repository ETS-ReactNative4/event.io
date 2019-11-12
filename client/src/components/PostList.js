import React from 'react'
import { FlatList } from 'react-native'
import PostListItemContainer from './PostListItemContainer'

export default React.memo(PostList)

function PostList(props) {
  console.log('PostList::render')
  return (
    <FlatList
      {...props}
      data={props.posts}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <PostListItemContainer post={item} />}
    />
  )
}
