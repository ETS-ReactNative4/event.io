import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-navigation';
import PostListItem from '../components/PostListItem';
import { useHttp } from '../hooks/http';
import SearchScreen from '../screens/SearchScreen';

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [res] = useHttp('/feed');
  res && res.then(posts => setPosts(posts));

  return (
    <View style={{ flex: 1 }}>
      <SearchScreen />
      {posts ? (
        <FlatList
          data={posts}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <PostListItem
              post={item}
              onPress={() => navigation.push('PostDetails', post)}
            />
          )}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

FeedScreen.navigationOptions = {
  title: 'Feed',
};

export default FeedScreen;
