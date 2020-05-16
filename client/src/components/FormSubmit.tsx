import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={{ color: 'white' }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    color: 'lightcyan',
    marginLeft: 'auto',
    marginRight: '12.5%',
    padding: 6,
    marginTop: 12,
    fontSize: 18,
  },
});
