import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Avatar from './Avatar';
import { withNavigation } from 'react-navigation';

const BaseUserListItem = ({ navigation, user, children, style }) => {
  return (
    <TouchableOpacity
      underlayColor="#eee"
      onPress={() => navigation.push('Profile', { id: user._id })}
      style={[styles.container, style]}>
      <Avatar style={{ marginRight: 12 }} size={48} user={user} />
      <Text style={{ fontSize: 18 }}>{user.username}</Text>
      {children}
    </TouchableOpacity>
  );
};

export default withNavigation(BaseUserListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
});
