import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import Icon from '../components/Icon';
import AuthContext from '../context/AuthContext';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };
  static contextType = AuthContext;
  constructor(props) {
    super(props);
  }

  async logout() {
    console.log('clicked');
    await this.context.logout();
    this.props.navigation.replace('Login');
  }

  settings = [
    {
      title: 'User',
      data: [
        {
          icon: 'contact',
          title: 'Change username',
          onPress: () => console.log('hello'),
        },
        {
          icon: 'navigate',
          title: 'Hide location',
          onPress: this.logout,
        },
        {
          icon: 'exit',
          title: 'Logout',
          onPress: this.logout,
        },
      ],
    },
  ];

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.settings}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <Item onPress={item.onPress} icon={item.icon} title={item.title} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </View>
    );
  }
}

function Item({ title, icon, onPress }) {
  return (
    <View onPress={onPress} style={styles.item}>
      <View style={{ flexDirection: 'row', padding: 0, margin: 0 }}>
        <Icon name={icon} style={{ fontSize: 32, marginRight: 25 }} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#eee',
    paddingVertical: 20,
    padding: 10,
  },
  header: {
    padding: 10,
    fontSize: 24,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
  },
});
