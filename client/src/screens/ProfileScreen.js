import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import PageView from '../components/PageView';
import Badge from '../components/Badge';
import { FriendsContext } from '../context/FriendsContext';
import { AuthContext } from '../context/AuthContext';
import FadeIn from '../components/animated/FadeIn';
import Avatar from '../components/Avatar';
import ScreenListItem from '../components/ScreenListItem';
import PostListItem from '../components/PostListItem';

export default ProfileScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const friendsCtx = useContext(FriendsContext);
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    try {
      const res = await authCtx.get('/posts');
      const data = await res.json();
      setPosts(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(getPosts, []);
  // handle socket subscriptions
  useEffect(() => {
    if (authCtx.socket) {
      authCtx.socket.on('post', getPosts);
    }
    return () => {
      if (authCtx.socket) {
        authCtx.socket.removeListener('post', getPosts);
      }
    };
  }, [authCtx]);
  return (
    <ScrollView>
      <PageView style={{ flex: 1 }}>
        <FadeIn duration={500}>
          <View style={styles.bioContainer}>
            <Avatar size={128} user={authCtx.user} />
            <View style={{ marginLeft: 32 }}>
              <Text style={styles.username}>{authCtx.user.username}</Text>
              <Text
                style={{ fontWieght: 'bold' }}
                onPress={() => navigation.navigate('Friends')}>
                Following {friendsCtx.friends.length}
              </Text>
            </View>
          </View>
          <Text>{authCtx.user.bio}</Text>
          {friendsCtx.requests.length > 0 && (
            <ScreenListItem
              onPress={() => navigation.navigate('FriendRequests')}
              text="Requests">
              <Badge text={friendsCtx.requests.length} />
            </ScreenListItem>
          )}
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 6 }}>
            Posts
          </Text>
          {posts.map(el => {
            return (
              <ScreenListItem
                text={el.title}
                onPress={() => {
                  navigation.navigate('NoteDetails', { post: el });
                }}
              />
            );
          })}
        </FadeIn>
      </PageView>
    </ScrollView>
  );
};

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

const styles = StyleSheet.create({
  bioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 12,
  },
  container: {},
  username: { fontSize: 22, marginBottom: 12 },
  email: { marginLeft: 'auto', fontSize: 12, color: 'gray' },
});
