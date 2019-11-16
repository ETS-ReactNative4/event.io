import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import ToggleIcon from './ToggleIcon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AuthContext } from '../context/AuthContext'
import { withNavigation } from 'react-navigation'

const PostListItemOptions = ({
  navigation,
  post,
  comments,
  like,
  commentToggle,
  onComment,
  onLike,
  onReply
}) => {
  const auth = useContext(AuthContext)

  function computeLikes() {
    const initialLike = post.likes.includes(auth.user.uid)
    return initialLike
      ? like
        ? post.likes.length
        : Math.max(0, post.likes.length - 1)
      : like
      ? post.likes.length + 1
      : post.likes.length
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.iconContainer}>
          <ToggleIcon
            active={like}
            onPress={() => onLike(!like)}
            activeColor='#d9534f'
            name='heart'
            style={styles.icon}
          />
          <TouchableOpacity
            onPress={() =>
              post.likes.length > 0 &&
              navigation.push('UserList', { users: post.likes, title: 'Likes' })
            }
          >
            <Text style={styles.counter}>{computeLikes()}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <ToggleIcon
            disabled={comments && comments.length === 0}
            active={commentToggle}
            activeColor='#428bca'
            onPress={onComment}
            style={styles.icon}
            name='text'
          />
          <Text style={styles.counter}>{comments && comments.length}</Text>
        </View>
        <TouchableOpacity onPress={onReply}>
          <Text style={{ fontSize: 10 }}>Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default withNavigation(PostListItemOptions)

const styles = StyleSheet.create({
  container: {
    paddingVertical: 3
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 36,
    marginRight: 12
  },
  icon: {
    fontSize: 22,
    color: 'gray'
  },
  counter: {
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 3
  }
})
