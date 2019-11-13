import React, { useEffect, useState, useContext } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { PostContext } from '../context/PostContext'
import Icon from '../components/Icon'
import PostList from '../components/PostList'
import FeedInfo from '../components/FeedInfo'
import _ from 'lodash'

FeedDetailsScreenContainer.navigationOptions = ({ navigation }) => {
  const feed = navigation.getParam('feed', null)
  return {
    title: feed.title
  }
}
export default function FeedDetailsScreenContainer({ navigation }) {
  const feedParam = navigation.getParam('feed', null)
  const feedId = feedParam._id
  const { feeds, getPosts } = useContext(PostContext)
  const feed = feeds[feedId]

  useEffect(() => {
    syncPosts()
  }, [])

  async function syncPosts() {
    const data = await getPosts(feed._id)
    return data.posts
  }
  return <FeedDetailsScreen navigation={navigation} refresh={syncPosts} feed={feed} />
}

function FeedDetailsScreen({ navigation, refresh, feed }) {
  const [showDescription, setShowDescription] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  function toggleDescription() {
    setShowDescription(!showDescription)
  }

  async function handleRefresh() {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }

  // Subcomponents
  const CustomPostList = () => {
    return (
      <View style={{ flex: 1 }}>
        {feed.posts && (
          <PostList
            onRefresh={handleRefresh}
            refreshing={refreshing}
            posts={feed.posts}
            ListHeaderComponent={<FeedInfo feed={feed} />}
          />
        )}
      </View>
    )
  }
  const PostButton = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push('Post', { feed })}
        style={{ zIndex: 1, position: 'absolute', bottom: 12, right: 12 }}
      >
        <Icon style={{ fontSize: 64, color: '#5bc0de' }} name='add-circle' />
      </TouchableOpacity>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      {feed ? (
        <>
          <CustomPostList />
          <PostButton />
        </>
      ) : (
        <Text>loading...</Text>
      )}
    </View>
  )
}
