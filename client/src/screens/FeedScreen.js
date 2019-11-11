import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, RefreshControl } from 'react-native';
import { FlatList } from 'react-navigation';
import SearchScreen from '../screens/SearchScreen';
import { PostContext } from '../context/PostContext';
import Icon from '../components/Icon';
import FeedItem from '../components/FeedItem';

function FeedScreen({ navigation }) {
  const { fetchFeeds, feeds, posts } = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);
  const REFRESH_RATE = 60 * 1000;

  useEffect(() => {
    let interval;
    setTimeout(() => {
      interval = setInterval(() => {
        fetchFeeds();
      }, REFRESH_RATE);
    }, REFRESH_RATE);
    return () => {
      clearInterval(interval);
    };
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    await fetchFeeds();
    setRefreshing(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <SearchScreen />
      {feeds.length > 0 ? (
        <FlatList
          data={feeds}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <FeedItem feed={item} />}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No feeds available.</Text>
        </View>
      )}
    </View>
  );
}
FeedScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Feeds',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('CreateFeed')}>
        <Icon
          style={{ fontSize: 32, marginRight: 24 }}
          name="add-circle-outline"
        />
      </TouchableOpacity>
    ),
  };
};
export default FeedScreen;
