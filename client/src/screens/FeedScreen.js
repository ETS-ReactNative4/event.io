import React, { useState, useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-navigation';
import PostListItemContainer from '../components/PostListItemContainer';
import SearchScreen from '../screens/SearchScreen';
import { PostContext } from '../context/PostContext';

const FeedScreen = orops => {
  const postCtx = useContext(PostContext);

  return (
    <View style={{ flex: 1 }}>
      <SearchScreen />
      {postCtx.feed ? (
        <FlatList
          data={postCtx.feed}
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
