import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PageView from '../components/PageView';
import FadeIn from '../components/animated/FadeIn';
import Avatar from '../components/Avatar';
import ScreenListItem from '../components/ScreenListItem';

export default OtherProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  function init() {
    setUser(navigation.getParam('user', {}));
  }
  // on init
  useEffect(init, []);

  return (
    <PageView style={{ flex: 1 }}>
      {user && (
        <FadeIn duration={250}>
          <View style={styles.bioContainer}>
            <Avatar size={128} user={user} />
            <View style={{ marginLeft: 32 }}>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </View>
          <Text>{user.bio}</Text>
        </FadeIn>
      )}
    </PageView>
  );
};
OtherProfileScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('user', {}).username,
  };
};

const styles = StyleSheet.create({
  bioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 12,
  },
  container: {},
  username: { fontSize: 22, marginBottom: 12 },
  email: { marginLeft: 'auto', fontSize: 12, color: 'gray' },
});
