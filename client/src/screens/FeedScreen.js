import React, { useContext, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-navigation';
import PostListItemContainer from '../components/PostListItemContainer';
import SearchScreen from '../screens/SearchScreen';
import { PostContext } from '../context/PostContext';

function FeedScreen({ navigation }) {
  const { fetchFeed, feed, posts } = useContext(PostContext);
  const REFRESH_RATE = 60 * 1000;

  useEffect(() => {
    let interval;
    setTimeout(() => {
      interval = setInterval(() => {
        fetchFeed();
      }, REFRESH_RATE);
    }, REFRESH_RATE);
    fetchFeed();
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SearchScreen />
      {feed ? (
        <FlatList
          data={feed}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <PostListItemContainer post={posts[item._id]} />
          )}
        />
      ) : (
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}

FeedScreen.navigationOptions = {
  title: 'Feed',
};

export default FeedScreen;
