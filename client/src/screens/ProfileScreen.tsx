import React, { useContext, useEffect, useState } from 'react'
import { Button, View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { FlatList } from 'react-navigation'
import Badge from '../components/Badge'
import { FriendsContext } from '../context/FriendsContext'
import { AuthContext } from '../context/AuthContext'
import Avatar from '../components/Avatar'
import ScreenListItem from '../components/ScreenListItem'
import PostListItem from '../components/PostListItem'
import Icon from '../components/Icon'
import { PostContext } from '../context/PostContext'
import { TouchableOpacity } from 'react-native-gesture-handler'

function ProfileScreen({ navigation }) {
  // all contexts
  const authCtx = useContext(AuthContext)
  const friendsCtx = useContext(FriendsContext)
  const { fetchProfile, getProfile, profiles, posts } = useContext(PostContext)

  const id = navigation.getParam('id', authCtx.user ? authCtx.user.uid : null)
  const [requestSent, setRequestSent] = useState(null)
  const profile = profiles[id] ? profiles[id] : null

  useEffect(() => {
    navigation.addListener('willFocus', () => fetchProfile(id))
    getProfile(id)
  }, [])

  async function getSentRequests() {
    const res = await authCtx.get('/friends/requests/sent')
    const requests = await res.json()

    requests.includes(auth.user.uid)
      ? setRequestSent(true)
      : setRequestSent(false)
  }

  async function sendFriendRequest() {
    await authCtx.get('/friends/requests', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ to: profileId })
    })
    setRequestSent(true)
  }

  return (
    <>
      {profile ? (
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Avatar size={100} user={profile.user} />
            <View style={{ marginLeft: 32 }}>
              <Text style={styles.username}>{profile.user.username}</Text>
              {profile.relationship !== 'other' ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('UserList', {
                      users: profile.user.friends,
                      title: 'Friends'
                    })
                  }
                >
                  <Text style={{ fontWeight: 'bold' }}>
                    Friends {profile.user.friends.length}
                  </Text>
                </TouchableOpacity>
              ) : requestSent ? (
                <Text title='Request sent'>Request Sent</Text>
              ) : (
                <Button onPress={sendFriendRequest} title='Add Friend' />
              )}
            </View>
          </View>

          {profile.relationship === 'self' && friendsCtx.requests.length > 0 && (
            <View style={{ paddingHorizontal: 22 }}>
              <ScreenListItem
                onPress={() => navigation.navigate('FriendRequests')}
                text='Requests'
              >
                <Badge text={friendsCtx.requests.length} />
              </ScreenListItem>
            </View>
          )}

          {profile.relationship !== 'other' ? (
            profile.posts.length > 0 ? (
              <FlatList
                keyExtractor={item => item._id}
                data={profile.posts}
                renderItem={({ item }) => (
                  <PostListItem
                    //showOptions={false}
                    showFeed={true}
                    postId={item._id}
                    feedId={item.feed}
                  />
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
                marginLeft: 12
              }}
            >
              <Icon style={{ fontSize: 22, marginRight: 12 }} name='lock' />
              <Text>Locked</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      )}
    </>
  )
}
ProfileScreen.navigationOptions = function({ navigation }) {
  return {
    title: navigation.getParam('title', 'Profile')
  }
}
export default ProfileScreen

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  },
  container: {},
  username: { fontSize: 22, marginBottom: 12 },
  email: { marginLeft: 'auto', fontSize: 12, color: 'gray' }
})
