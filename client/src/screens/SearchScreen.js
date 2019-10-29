import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import BaseTextInput from '../components/BaseTextInput';
import Icon from '../components/Icon';
import { AuthContext } from '../context/AuthContext';
import UserListItem from '../components/UserListItem';
export default class SearchScreen extends React.Component {
  state = {
    searchUsers: [],
    friendRequests: [],
  };
  static contextType = AuthContext;
  static navigationOptions = {
    title: 'Search',
  };

  async sendFriendRequest(id) {
    const res = await this.context.get('/friends/requests', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ to: id }),
    });
    const data = await res.json();
    console.log('sent friend req', data);
  }

  getUsers = async text => {
    const res = await this.context.get(`/users?q=${text}`);
    const data = await res.json();
    this.setState({ searchUsers: data });
  };

  getRequests = async () => {
    const res = await this.context.get('/friends/requests');
    const data = await res.json();
    console.log('friend requests', data);
    this.setState({ friendRequests: data });
  };

  async componentDidMount() {
    await this.getRequests();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.searchbar}>
          <Icon style={styles.icon} name="search" />
          <BaseTextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => this.getUsers(text)}
            placeholder="Search for users..."
            style={styles.searchInput}
          />
        </View>
        <FlatList
          data={this.state.searchUsers}
          renderItem={({ item }) => (
            <UserListItem
              onAdd={() => this.sendFriendRequest(item._id)}
              username={item.username}
            />
          )}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchbar: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    alignItems: 'center',
    padding: 6,
  },
  searchInput: {
    marginLeft: 12,
    flex: 1,
  },
  icon: {
    marginLeft: 12,
    fontSize: 32,
    marginBottom: 'auto',
    marginTop: 'auto',
  },
});
