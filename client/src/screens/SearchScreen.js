import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BaseTextInput from '../components/BaseTextInput';
import Icon from '../components/Icon';

export default class SearchScreen extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.searchbar}>
          <Icon style={styles.icon} name="search" />
          <BaseTextInput placeholder="Search..." style={styles.searchInput} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchbar: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 20,
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
