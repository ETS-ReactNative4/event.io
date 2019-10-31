import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
});
export default ({ onPress, user, children }) => {
  return (
    <TouchableOpacity
      underlayColor="#eee"
      onPress={onPress}
      style={styles.container}>
      <Avatar
        rounded={false}
        style={{ marginRight: 12 }}
        size={48}
        user={user}
      />
      <Text style={{ fontSize: 22 }}>{user.username}</Text>
      {children}
    </TouchableOpacity>
  );
};
