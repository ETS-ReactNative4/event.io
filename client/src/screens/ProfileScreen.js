import React, { useContext, useEffect, useState } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-navigation';
import Badge from '../components/Badge';
import { FriendsContext } from '../context/FriendsContext';
import { AuthContext } from '../context/AuthContext';
import Avatar from '../components/Avatar';
import ScreenListItem from '../components/ScreenListItem';
import PostListItemContainer from '../components/PostListItemContainer';
import Icon from '../components/Icon';
import { PostContext } from '../context/PostContext';

const ProfileScreen = ({ navigation }) => {
  // all contexts
  const authCtx = useContext(AuthContext);
  const friendsCtx = useContext(FriendsContext);
  const postCtx = useContext(PostContext);
  // state
  const [data, setData] = useState(null);
  const [requestSent, setRequestSent] = useState(null);
  const profileId = navigation.getParam(
    'id',
    authCtx.user ? authCtx.user.uid : null,
  );

  navigation.on;

  useEffect(() => {
    postCtx.getProfile(profileId).then(data => {
      setData(data);
      if (data && data.relationship === 'other') {
        getSentRequests();
      }
    });
  }, []);

  async function getSentRequests() {
    const res = await authCtx.get('/friends/requests/sent');
    const requests = await res.json();

    requests.includes(auth.user.uid)
      ? setRequestSent(true)
      : setRequestSent(false);
  }

  async function sendFriendRequest() {
    await authCtx.get('/friends/requests', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to: profileId }),
    });
    setRequestSent(true);
  }

  return (
    <>
      {data ? (
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Avatar size={128} user={data.user} />
            <View style={{ marginLeft: 32 }}>
              <Text style={styles.username}>{data.user.username}</Text>
              {data.relationship !== 'other' ? (
                <Text
                  style={{ fontWeight: 'bold' }}
                  onPress={() => navigation.push('Friends')}>
                  Friends {data.user.friends.length}
                </Text>
              ) : requestSent ? (
                <Text title="Request sent">Request Sent</Text>
              ) : (
                <Button onPress={sendFriendRequest} title="Add Friend" />
              )}
            </View>
          </View>

          {data.relationship === 'self' && friendsCtx.requests.length > 0 && (
            <View style={{ paddingHorizontal: 22 }}>
              <ScreenListItem
                onPress={() => navigation.navigate('FriendRequests')}
                text="Requests">
                <Badge text={friendsCtx.requests.length} />
              </ScreenListItem>
            </View>
          )}

          {data.relationship !== 'other' ? (
            data.posts.length > 0 ? (
              <FlatList
                keyExtractor={item => item._id}
                data={data.posts.reverse()}
                renderItem={({ item }) => (
                  <PostListItemContainer id={item._id} />
                )}
              />
            ) : (
              <Text style={{ fontSize: 22, margin: 12 }}>
                There are no posts
              </Text>
            )
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 12,
              }}>
              <Icon style={{ fontSize: 22, marginRight: 12 }} name="lock" />
              <Text>Locked</Text>
            </View>
          )}
        </View>
      ) : (
        <Text>Loading</Text>
      )}
    </>
  );
};
ProfileScreen.navigationOptions = function({ navigation }) {
  return {
    title: navigation.getParam('title', 'Profile'),
  };
};
export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  container: {},
  username: { fontSize: 22, marginBottom: 12 },
  email: { marginLeft: 'auto', fontSize: 12, color: 'gray' },
});
