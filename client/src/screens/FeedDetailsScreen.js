import React, { useEffect, useState, useContext } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { PostContext } from '../context/PostContext'
import Icon from '../components/Icon'
import FadeIn from '../components/animated/FadeIn'
import FeedInfo from '../components/FeedInfo'
import _ from 'lodash'
import { FlatList } from 'react-native-gesture-handler'
import PostListItem from '../components/PostListItem'

FeedDetailsScreenContainer.navigationOptions = ({ navigation }) => {
  const feed = navigation.getParam('feed', null)
  return {
    title: feed.title
  }
}
export default function FeedDetailsScreenContainer({ navigation }) {
  const feedParam = navigation.getParam('feed', null)
  const feedId = feedParam._id
  const { feeds, fetchFeed } = useContext(PostContext)
  const feed = feeds[feedId]

  useEffect(() => {
    fetchFeed(feedId)
  }, [])

  return (
    <FeedDetailsScreen
      navigation={navigation}
      refresh={() => fetchFeed(feedId)}
      feed={feed}
    />
  )
}

const FeedDetailsScreen = React.memo(
  ({ navigation, refresh, feed }) => {
    const [refreshing, setRefreshing] = useState(false)
    async function handleRefresh() {
      setRefreshing(true)
      await refresh()
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

    const FeedPostList = ({ feed }) => {
      const sortedPosts = feed.posts.reverse()
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            data={sortedPosts}
            refreshing={refreshing}
            keyExtractor={item => item}
            onRefresh={handleRefresh}
            ListEmptyComponent={<EmptyList />}
            ListHeaderComponent={<FeedInfo feed={feed} />}
            renderItem={({ item }) => (
              <PostListItem postId={item} feedId={feed._id} />
            )}
          />
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
          <View style={{ flex: 1 }}>
            <FadeIn duration={300}>
              <FeedPostList feed={feed} />
              <PostButton />
            </FadeIn>
          </View>
        ) : (
          <Text>loading...</Text>
        )}
      </>
    )
  },
  (prev, next) => {
    return prev === next
  }
)
