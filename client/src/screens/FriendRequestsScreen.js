import React, { useContext } from 'react';
import { FriendRequestContext } from '../context/FriendRequestContext.js';
import { View, Button, Text, FlatList, Image } from 'react-native';
import AuthContext from '../context/AuthContext';

const RequestItem = ({ id, from, onAccept, onDecline }) => {
  const auth = useContext(AuthContext);
  async function respond(id, accept) {
    const res = await auth.get(`/friends/requests/${id}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ accept }),
    });
    const data = await res.json();
    console.log(data);
  }
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
      <Image
        style={{ width: 48, height: 48, marginRight: 24, borderRadius: 100 }}
        source={{
          uri: `https://fakeimg.pl/48x48/333/?text=${from.username[0].toUpperCase()}&font=noto`,
        }}
      />
      <Text style={{ fontSize: 24 }}>{from.username}</Text>
      <View style={{ marginLeft: 'auto' }}>
        <Button
          onPress={() => respond(id, true)}
          style={{ marginLeft: 'auto', fontSize: 32 }}
          title="Accept"
        />
      </View>
      <Button title="Decline" onPress={() => respond(id, false)} />
    </View>
  );
};

export default class FriendRequestsScreen extends React.Component {
  static contextType = FriendRequestContext;
  static navigationOptions = {
    title: 'Friend Requests',
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.context.friendRequests}
          keyExtractor={item => item._id}
          renderItem={({ item }) => {
            return <RequestItem id={item._id} from={item.from} />;
          }}
        />
      </View>
    );
  }
}
