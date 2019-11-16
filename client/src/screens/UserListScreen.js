import React, { useState, useContext, useEffect } from 'react'
import { FlatList } from 'react-native'
import BaseUserListItem from '../components/BaseUserListItem'
import { AuthContext } from '../context/AuthContext'

UserListScreen.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam('title', 'Users')
  return {
    title
  }
}
export default function UserListScreen({ navigation }) {
  const users = navigation.getParam('users', null) // [ uid ]
  const [userData, setUserData] = useState(null)
  const auth = useContext(AuthContext)
  const stringifiedUsers = users ? users.join() : null

  useEffect(() => {
    auth.get(`/users/uid?q=${stringifiedUsers}`).then(res => {
      res.json().then(data => {
        console.log(data)
        setUserData(data.users)
      })
    })
  }, [])
  // need to make request
  return (
    <FlatList
      data={userData}
      renderItem={({ item }) => <BaseUserListItem user={item} />}
      keyExtractor={item => item._id}
    />
  )
}
