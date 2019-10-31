import React, { useContext } from 'react';
import { View, Button, Text, FlatList } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { FriendsContext } from '../context/FriendsContext';
import BaseUserListItem from '../components/BaseUserListItem';

const RequestItem = ({ id, from }) => {
  const auth = useContext(AuthContext);
  function respond(id, accepted) {
    auth.get(`/friends/requests/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accepted: accepted }),
    });
  }

  return (
    <BaseUserListItem user={from}>
      <View style={{ marginLeft: 'auto', flexDirection: 'row' }}>
        <Button
          onPress={() => respond(id, true)}
          style={{ marginLeft: 'auto', fontSize: 32 }}
          title="Accept"
        />
        <Button title="Decline" onPress={() => respond(id, false)} />
      </View>
    </BaseUserListItem>
  );
};

export default class FriendRequestsScreen extends React.Component {
  static contextType = FriendsContext;
  static navigationOptions = {
    title: 'Friend Requests',
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.context.requests.length > 0 ? (
          <FlatList
            data={this.context.requests}
            keyExtractor={item => item._id}
            renderItem={({ item }) => {
              return <RequestItem id={item._id} from={item.from} />;
            }}
          />
        ) : (
          <Text style={{ fontSize: 18, padding: 12 }}>
            You have no friend requests!
          </Text>
        )}
      </View>
    );
  }
}
