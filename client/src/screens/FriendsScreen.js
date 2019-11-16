import React, { useContext } from 'react'
import { View, Text, FlatList } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { FriendsContext } from '../context/FriendsContext'
import BaseUserListItem from '../components/BaseUserListItem'
import Avatar from '../components/Avatar'

export default FriendsScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext)
  const friendsCtx = useContext(FriendsContext)

  async function getUserDetails(id) {
    const res = await authCtx.get(`/user/${id}`)
    const data = await res.json()
    navigation.push('Profile', { id: id })
  }

  return (
    <View style={{ flex: 1 }}>
      {friendsCtx.friends.length > 0 ? (
        <FlatList
          data={friendsCtx.friends}
          keyExtractor={item => item._id}
          renderItem={({ item }) => {
            return (
              <BaseUserListItem
                onPress={() => getUserDetails(item._id)}
                id={item._id}
                user={item}
              />
            )
          }}
        />
      ) : (
        <Text style={{ fontSize: 18, padding: 12 }}>
          Add friends by tapping the search icon!
        </Text>
      )}
    </View>
  )
}
FriendsScreen.navigationOptions = {
  title: 'Following'
}
