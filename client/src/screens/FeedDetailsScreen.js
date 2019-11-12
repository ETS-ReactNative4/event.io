import React, { useEffect, useState, useContext } from 'react'
import { TouchableOpacity, View, Text, FlatList } from 'react-native'
import Avatar from '../components/Avatar'
import Icon from '../components/Icon'
import PostListItemContainer from '../components/PostListItemContainer'
import { PostContext } from '../context/PostContext'
import PostList from '../components/PostList'

import _ from 'lodash'

FeedDetailsScreenContainer.navigationOptions = ({ navigation }) => {
  const feed = navigation.getParam('feed', null)
  return {
    title: feed.title
  }
}
export default function FeedDetailsScreenContainer({ navigation }) {
  const feed = navigation.getParam('feed', null)
  const [internalPosts, setPosts] = useState(null)
  const { getPosts } = useContext(PostContext)

  useEffect(() => {
    syncPosts()
  }, [])

  async function syncPosts() {
    const data = await getPosts(feed._id)
    if (data.posts !== internalPosts) setPosts(data.posts)
    return data.posts
  }

  return (
    <MemoFeedDetailsScreen
      navigation={navigation}
      refresh={syncPosts}
      posts={internalPosts}
      feed={feed}
    />
  )
}

const MemoFeedDetailsScreen = React.memo(FeedDetailsScreen, (prev, next) => {
  return prev.posts === next.posts
})

function FeedDetailsScreen({ navigation, refresh, feed, posts }) {
  const [showDescription, setShowDescription] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  console.log('FeedDetailsScreen::render')
  function toggleDescription() {
    setShowDescription(!showDescription)
  }

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
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>This feed has no posts.</Text>
      </View>
    )
  }

  // Subcomponents
  const CustomPostList = () => {
    return (
      <View style={{ flex: 1 }}>
        {posts && (
          <PostList
            onRefresh={handleRefresh}
            refreshing={refreshing}
            posts={posts.reverse()}
            ListEmptyComponent={<EmptyList />}
            ListHeaderComponent={feedInfo(feed)}
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
  const feedInfo = feed => {
    return (
      <View
        style={{
          padding: 12,
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray'
        }}
      >
        <View
          style={{
            paddingVertical: 12,
            flexDirection: 'row'
            //alignItems: 'center',
          }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Avatar size={100} rounded={false} user={feed.user} />
          </View>
          <View style={{ flex: 1, marginLeft: 22 }}>
            <Text style={{ fontSize: 16, marginBottom: 6 }}>{feed.title}</Text>
            <Text style={{ marginBottom: 6, fontSize: 12 }}>
              <Text style={{ fontWeight: 'bold' }}>{feed.audience} </Text>
              feed created by <Text style={{ fontWeight: 'bold' }}>{feed.user.username}</Text>
            </Text>
            {feed.address && (
              <Text style={{ fontStyle: 'italic', fontSize: 12, color: '#444' }}>
                {feed.address}
              </Text>
            )}
            <TouchableOpacity onPress={toggleDescription}>
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 6,
                  color: '#0275d8'
                }}
              >
                {showDescription ? 'Hide Info' : 'Show Info'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {showDescription && (
          <Text style={{ paddingVertical: 6, fontSize: 14 }}>{feed.description}</Text>
        )}
      </View>
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
