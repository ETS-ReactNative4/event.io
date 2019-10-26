import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './Icon';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 18,
  },
  icon: {
    marginLeft: 'auto',
    fontSize: 32,
  },
});

export default ({ username, onAdd }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.text}>{username}</Text>
        <TouchableOpacity onPress={onAdd} style={styles.icon}>
          <Icon style={styles.icon} name="person-add"></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};
