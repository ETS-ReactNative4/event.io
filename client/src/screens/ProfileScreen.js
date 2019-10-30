import React, { useContext } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Icon from '../components/Icon';
import PageView from '../components/PageView';
import Badge from '../components/Badge';
import { FriendRequestContext } from '../context/FriendRequestContext';
import FadeIn from '../components/animated/FadeIn';

const ListItem = ({ text, badge, onPress }) => {
  const ctx = useContext(FriendRequestContext);
  return (
    <TouchableOpacity style={{ backgroundColor: 'white' }} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 18, marginRight: 12 }}>{text}</Text>
        {ctx.friendRequests.length > 0 && (
          <Badge text={ctx.friendRequests.length} />
        )}
        <Icon
          style={{ marginLeft: 'auto', fontSize: 18 }}
          name="arrow-dropright"></Icon>
      </View>
    </TouchableOpacity>
  );
};

export default function ProfileScreen(props) {
  const auth = useContext(AuthContext);
  const fr = useContext(FriendRequestContext);
  return (
    <PageView style={{ flex: 1 }}>
      <FadeIn duration={500}>
        <View style={styles.bioContainer}>
          <Image
            style={{ width: 100, height: 100, borderRadius: 100 }}
            source={{
              uri: `https://fakeimg.pl/100x100/333/?text=${auth.user.username[0].toUpperCase()}&font=noto`,
            }}
          />
          <View style={{ marginLeft: 32 }}>
            <Text style={styles.username}>{auth.user.username}</Text>
            <Text style={styles.email}>{auth.user.email}</Text>
          </View>
        </View>
        <Text>{auth.user.bio}</Text>
        {fr.friendRequests.length > 0 && (
          <ListItem
            onPress={() => props.navigation.navigate('FriendRequests')}
            text="Friend Requests"></ListItem>
        )}
        <ListItem
          text={`Friends (${fr.friends.length})`}
          onPress={() => props.navigation.navigate('Friends')}
        />
      </FadeIn>
    </PageView>
  );
}

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
