import React from 'react'
import FeedItem from './FeedItem'
import { FlatList } from 'react-navigation'
import { View, Text } from 'react-native'

export default function FeedList(props) {
  const EmptyList = () => {
    return (
      <View
        style={{
          paddingVertical: 12,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>No feeds available.</Text>
      </View>
    )
  }
  return (
    <FlatList
      {...props}
      ListEmptyComponent={EmptyList()}
      data={props.feeds}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <FeedItem feed={item} />}
    />
  )
}
