import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { FlatList } from 'react-navigation'
import { PostContext } from '../context/PostContext'
import Search from '../components/Search'
import FeedList from '../components/FeedList'
import Icon from '../components/Icon'
import _ from 'lodash'

FeedScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Feeds',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('CreateFeed')}>
        <Icon style={{ fontSize: 32, marginRight: 24 }} name='add-circle-outline' />
      </TouchableOpacity>
    )
  }
}

function FeedScreen({ navigation }) {
  const { getFeeds, fetchFeeds, posts } = useContext(PostContext)
  const [internalFeeds, setInternalFeeds] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const REFRESH_RATE = 60 * 1000

  // On mount
  useEffect(() => {
    getFeeds().then(feeds => setInternalFeeds(feeds))
    let interval = setInterval(syncFeeds, REFRESH_RATE)
    return () => clearInterval(interval)
  }, [])

  async function syncFeeds() {
    const feeds = await fetchFeeds()
    setInternalFeeds(feeds)
    return feeds
  }

  async function handleRefresh() {
    setRefreshing(true)
    await syncFeeds()
    setRefreshing(false)
  }

  return (
    <React.Fragment>
      <Search />
      <FeedList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        feeds={_.toArray(internalFeeds)}
      />
    </React.Fragment>
  )
}

export default FeedScreen
