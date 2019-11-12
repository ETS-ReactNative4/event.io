import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Moment from 'react-moment'
import 'moment-timezone'

export default React.memo(function PostHeader({ username, date }) {
  return (
    <View style={styles.container}>
      <Text style={styles.username}>{username}</Text>
      <Moment fromNow element={Text} style={styles.date}>
        {date}
      </Moment>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3
  },
  username: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold'
  },
  date: {
    color: 'gray',
    fontSize: 12
  }
})
