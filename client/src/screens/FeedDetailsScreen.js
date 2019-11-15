import React, { useEffect, useState, useContext } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { PostContext } from '../context/PostContext'
import Icon from '../components/Icon'
import FadeIn from '../components/animated/FadeIn'
import FeedInfo from '../components/FeedInfo'
import _ from 'lodash'
import { FlatList } from 'react-native-gesture-handler'
import PostListItem from '../components/PostListItem'

FeedDetailsScreen.navigationOptions = ({ navigation }) => {
  const feed = navigation.getParam('feed', null)
  return {
    title: feed.title
  }
}

export default function FeedDetailsScreen({ navigation }) {
  const feedParam = navigation.getParam('feed', null)
  const feedId = feedParam._id
  const { feeds, fetchFeed } = useContext(PostContext)
  const feed = feeds[feedId]
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchFeed(feedId)
  }, [])

  function handleRefresh() {
    console.log('refreshing')
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 3000)
    setRefreshing(false)
  }

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

  const PostButton = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push('Post', { feed })}
        style={{ zIndex: 1, position: 'absolute', bottom: 12, right: 12 }}
      >
        <Icon
          style={{ fontSize: 64, color: 'rgba(91, 192, 222, 0.8)' }}
          name='add-circle'
        />
      </TouchableOpacity>
    )
  }
  return (
    <>
      {feed ? (
        <FadeIn duration={250}>
          <View style={{ flex: 1 }}>
            <FlatList
              refreshing={refreshing}
              onRefresh={handleRefresh}
              data={[...feed.posts].reverse()}
              keyExtractor={item => {
                return item
              }}
              ListEmptyComponent={<EmptyList />}
              ListHeaderComponent={<FeedInfo feed={feed} />}
              renderItem={({ item }) => (
                <PostListItem postId={item} feedId={feed._id} />
              )}
            />
            <PostButton />
          </View>
        </FadeIn>
      ) : (
        <Text>loading...</Text>
      )}
    </>
  )
}
