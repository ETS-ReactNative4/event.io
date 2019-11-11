import React, { useEffect, useState, useContext } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  LayoutAnimation,
} from 'react-native';
import Avatar from '../components/Avatar';
import PostListItem from '../components/PostListItemContainer';
import Icon from '../components/Icon';
import PostListItemContainer from '../components/PostListItemContainer';
import { PostContext } from '../context/PostContext';

FeedDetailsScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('feed').title,
  };
};
export default function FeedDetailsScreen({ navigation }) {
  const [showDescription, setShowDescription] = useState(false);
  const feed = navigation.getParam('feed', null);
  const postCtx = useContext(PostContext);
  const posts = postCtx.posts[feed._id];

  function toggleDescription() {
    setShowDescription(!showDescription);
  }

  useEffect(() => {
    if (feed) {
      postCtx.getPosts(feed._id);
    }
  }, [feed]);

  const PostList = () => {
    return (
      <>
        {posts ? (
          <FlatList
            data={posts}
            keyExtractor={item => item._id}
            renderItem={({ item }) => {
              <PostListItemContainer post={item} />;
            }}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This feed has no posts.</Text>
          </View>
        )}
      </>
    );
  };
  const PostButton = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push('Post', { feed })}
        style={{ position: 'absolute', bottom: 12, right: 12 }}>
        <Icon style={{ fontSize: 64, color: '#0275d8' }} name="add-circle" />
      </TouchableOpacity>
    );
  };
  const feedInfo = feed => {
    return (
      <View
        style={{
          padding: 12,
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
        }}>
        <View
          style={{
            paddingVertical: 12,
            flexDirection: 'row',
            //alignItems: 'center',
          }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Avatar size={100} rounded={false} user={feed.user} />
          </View>
          <View style={{ flex: 1, marginLeft: 22 }}>
            <Text style={{ fontSize: 16, marginBottom: 6 }}>{feed.title}</Text>
            <Text style={{ marginBottom: 6, fontSize: 12 }}>
              Created by{' '}
              <Text style={{ fontWeight: 'bold' }}>{feed.user.username}</Text>
            </Text>
            {feed.address && (
              <Text
                style={{ fontStyle: 'italic', fontSize: 12, color: '#444' }}>
                {feed.address}
              </Text>
            )}
            <TouchableOpacity onPress={toggleDescription}>
              <Text
                style={{
                  fontSize: 12,
                  //fontWeight: 'bold',
                  marginTop: 6,
                  color: '#0275d8',
                }}>
                {showDescription ? 'Hide Info' : 'Show Info'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {showDescription && (
          <>
            <Text style={{ fontWeight: 'bold' }}>Description</Text>
            <Text style={{ paddingVertical: 12, fontSize: 14 }}>
              {feed.description}
            </Text>
          </>
        )}
        {posts && (
          <FlatList
            data={feed.posts}
            keyExtractor={item => item._id}
            renderItem={({ item }) => <PostListItem post={item} />}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {feed ? (
        <View style={{ flex: 1 }}>
          {feedInfo(feed)}
          <PostList />
          <PostButton />
        </View>
      ) : (
        <Text>loading...</Text>
      )}
    </View>
  );
}
