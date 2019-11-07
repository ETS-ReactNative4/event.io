import React, { useState, useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-navigation';
import PostListItemContainer from '../components/PostListItemContainer';
import SearchScreen from '../screens/SearchScreen';
import { PostContext } from '../context/PostContext';
import { AuthContext } from '../context/AuthContext';

const FeedScreen = orops => {
  const [posts, setPosts] = useState([]);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    onMount();
  }, []);

  async function onMount() {
    try {
      const res = await authCtx.get('/feed');
      const posts = await res.json();
      setPosts(posts);
    } catch (err) {
      console.log('Error::FeedScreen::onMount', err);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <SearchScreen />
      {posts ? (
        <FlatList
          data={posts}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <PostListItemContainer id={item._id} />}
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
