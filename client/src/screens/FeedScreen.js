import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
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
        <Icon
          style={{ fontSize: 32, marginRight: 24 }}
          name='add-circle-outline'
        />
      </TouchableOpacity>
    )
  }
}

function FeedScreen({ navigation }) {
  const { fetchFeeds, feeds } = useContext(PostContext)
  const [refreshing, setRefreshing] = useState(false)
  // initialize first get and subsequent refresheu
  useEffect(() => {
    fetchFeeds()
    navigation.addListener('willFocus', fetchFeeds)
  }, [])

  async function handleRefresh() {
    setRefreshing(true)
    await fetchFeeds()
    setRefreshing(false)
  }

  return (
    <>
      <Search />
      <FeedList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        feeds={_.toArray(feeds)} // re renders on every change need to get rid of this
      />
    </>
  )
}

export default FeedScreen
