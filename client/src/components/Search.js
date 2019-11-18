import React, { useState, useContext } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { FriendsContext } from '../context/FriendsContext'

import BaseTextInput from './BaseTextInput'
import Icon from './Icon'
import BaseUserListItem from './BaseUserListItem'

export default function Search() {
  const [searchUsers, setSearchUsers] = useState([])
  const authContext = useContext(AuthContext)
  const friendsContext = useContext(FriendsContext)

  getUsers = async text => {
    const res = await authContext.get(`/users?q=${text}`)
    const data = await res.json()
    setSearchUsers(data)
  }

  return (
    <View>
      <View style={styles.searchbar}>
        <Icon style={styles.icon} name='search' />
        <BaseTextInput
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={text => getUsers(text)}
          placeholder='Search for users...'
          style={styles.searchInput}
        />
      </View>
      <FlatList
        data={searchUsers}
        renderItem={({ item }) => (
          <BaseUserListItem
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: 'lightgray'
            }}
            user={item}
          ></BaseUserListItem>
        )}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchbar: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    alignItems: 'center',
    padding: 6
  },
  searchInput: {
    marginLeft: 12,
    flex: 1
  },
  icon: {
    marginLeft: 12,
    fontSize: 32,
    marginBottom: 'auto',
    marginTop: 'auto'
  }
})
