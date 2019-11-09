import React, { useContext, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-navigation';
import PostListItemContainer from '../components/PostListItemContainer';
import SearchScreen from '../screens/SearchScreen';
import { PostContext } from '../context/PostContext';
import { AuthContext } from '../context/AuthContext';

function FeedScreen({ navigation }) {
  const { fetchFeed, feed, posts } = useContext(PostContext);
  const { user } = useContext(AuthContext);

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
