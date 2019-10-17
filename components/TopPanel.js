import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class TopPanel extends React.Component {
  truncateTitle() {
    const MAX_TITLE_LENGTH = 20;
    let { title } = this.props;
    if (!title) {
      return 'Untitled';
    }
    if (title.length > MAX_TITLE_LENGTH) {
      return title.slice(0, MAX_TITLE_LENGTH) + '...';
    }
    return title;
  }
  render() {
    const title = this.truncateTitle();
    return (
      <View style={styles.nav}>
        <Icon
          onPress={() => this.props.navigation.navigate('NoteView')}
          style={styles.icon}
          name="ios-arrow-round-back"
        />
        <Text style={styles.text}>{title}</Text>
        <Icon style={styles.icon} name="ios-close" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    fontSize: 32,
  },
  text: {
    fontSize: 18,
  },
  nav: {
    elevation: 1,
    zIndex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    height: 48,
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
