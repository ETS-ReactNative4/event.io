import React, { useEffect, useContext, useState } from 'react'
import { PostContext } from '../context/PostContext'
import { View, Text } from 'react-native'
import { FlatList } from 'react-navigation'
import PostListItem from '../components/PostListItem'
import Search from '../components/Search'

HomeScreen.navigationOptions = {
  title: 'Home'
}
export default function HomeScreen({ navigation }) {
  const postCtx = useContext(PostContext)
  const [posts, setPosts] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchHome()
    navigation.addListener('willFocus', fetchHome)
  }, [])

  function EmptyList() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ padding: 12 }}>No posts available.</Text>
      </View>
    )
  }

  function fetchHome() {
    postCtx.fetchHome().then(setPosts)
  }

  function getPosts() {
    setRefreshing(true)
    postCtx.fetchHome().then(data => {
      setPosts(data)
      setRefreshing(false)
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <Search />
      <FlatList
        ListEmptyComponent={EmptyList()}
        refreshing={refreshing}
        onRefresh={getPosts}
        data={posts}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <PostListItem showFeed={true} feedId={item.feed} postId={item._id} />
        )}
      />
    </View>
  )
}
