import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import Avatar from './Avatar';

function FeedItem({ navigation, feed }) {
  return (
    <TouchableHighlight
      underlayColor="lightgray"
      onPress={() => navigation.push('FeedDetails', { feed })}>
      <View
        style={{
          flexDirection: 'row',
          padding: 12,
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
        }}>
        <Avatar rounded={false} size={64} user={feed.user} />
        <View style={{ flex: 1 }}>
          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 3,
                fontWeight: 'bold',
              }}>
              {feed.user.username}
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 3 }}>{feed.title}</Text>
            <Text style={{ fontSize: 12, color: '#444' }}>{feed.address}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}
export default withNavigation(FeedItem);
