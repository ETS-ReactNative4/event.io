import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Avatar from './Avatar'

export default function FeedInfo({ feed }) {
  return (
    <View
      style={{
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
      }}
    >
      <View
        style={{
          paddingVertical: 12,
          flexDirection: 'row'
        }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Avatar size={100} rounded={false} user={feed.user} />
        </View>
        <View style={{ flex: 1, marginLeft: 22 }}>
          <Text style={{ fontSize: 16, marginBottom: 6 }}>{feed.title}</Text>
          <Text style={{ marginBottom: 6, fontSize: 12 }}>
            <Text style={{ fontWeight: 'bold' }}>{feed.audience} </Text>
            feed created by{' '}
            <Text style={{ fontWeight: 'bold' }}>{feed.user.username}</Text>
          </Text>
          {feed.address && (
            <Text style={{ fontStyle: 'italic', fontSize: 12, color: '#444' }}>
              {feed.address}
            </Text>
          )}
          {/* <TouchableOpacity onPress={toggleDescription}>
            <Text
              style={{
                fontSize: 12,
                marginTop: 6,
                color: '#0275d8'
              }}
            >
              {showDescription ? 'Hide Info' : 'Show Info'}
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
      {/* {showDescription && (
        <Text style={{ paddingVertical: 6, fontSize: 14 }}>{feed.description}</Text>
      )} */}
    </View>
  )
}
