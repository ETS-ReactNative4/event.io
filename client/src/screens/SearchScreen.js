import React, { useState, useContext } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import BaseTextInput from '../components/BaseTextInput';
import Icon from '../components/Icon';
import { AuthContext } from '../context/AuthContext';
import { FriendsContext } from '../context/FriendsContext';
import BaseUserListItem from '../components/BaseUserListItem';

export default function SearchScreen() {
  const [searchUsers, setSearchUsers] = useState([]);
  const authContext = useContext(AuthContext);
  const friendsContext = useContext(FriendsContext);

  sendFriendRequest = async id => {
    console.log('pressed');
    const res = await authContext.get('/friends/requests', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ to: id }),
    });
    if (res.ok) {
      console.log(res.json());
    }
  };

  getUsers = async text => {
    const res = await authContext.get(`/users?q=${text}`);
    const data = await res.json();
    setSearchUsers(data);
  };

  isFriend = id => {
    for (let f of friendsContext.friends) {
      if (f._id === id) return true;
    }
    return false;
  };

  return (
    <View>
      <View style={styles.searchbar}>
        <Icon style={styles.icon} name="search" />
        <BaseTextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => getUsers(text)}
          placeholder="Search for users..."
          style={styles.searchInput}
        />
      </View>
      <FlatList
        data={searchUsers}
        renderItem={({ item }) => (
          <BaseUserListItem
            style={{ backgroundColor: '#ddd', padding: 12 }}
            user={item}></BaseUserListItem>
        )}
        keyExtractor={item => item._id}
      />
    </View>
  );
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
