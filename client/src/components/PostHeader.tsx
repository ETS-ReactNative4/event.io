import React from 'react'
import { View, Text, StyleSheet, touchableO } from 'react-native'
import { withNavigation } from 'react-navigation'
import Moment from 'react-moment'
import 'moment-timezone'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FeedDetailsScreen from '../screens/FeedDetailsScreen'

export default withNavigation(
  React.memo(function PostHeader({ navigation, feed, username, date }) {
    let feedTitle = feed && feed.title
    // const MAX_TITLE_LENGTH = 25
    // if (feedTitle.length > MAX_TITLE_LENGTH) {
    //   feedTitle = feedTitle.slice(0, MAX_TITLE_LENGTH) + '...'
    // }
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.username}>{username}</Text>

          <Moment fromNow element={Text} style={styles.date}>
            {date}
          </Moment>
        </View>
        {feedTitle && (
          <TouchableOpacity
            onPress={() => navigation.push('FeedDetails', { feed })}
          >
            <Text style={styles.feedTitle}>@{feedTitle}</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  })
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    //alignItems: 'center',
    paddingVertical: 3
  },
  username: {
    fontSize: 14,
    marginRight: 6,
    fontWeight: 'bold'
  },
  date: {
    color: 'gray',
    fontSize: 12,
    marginLeft: 'auto'
  },
  feedTitle: {
    flex: 1,
    marginBottom: 3,
    fontStyle: 'italic',
    color: '#0275d8',
    fontWeight: 'normal'
  }
})
