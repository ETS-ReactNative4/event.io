import React from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  state = {
    data: [],
  };
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts').then(res => {
      res.json().then(data => {
        this.setState({ data });
      });
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <Text>{item.title}</Text>}
        />
        <Icon
          style={styles.icon}
          name="ios-add-circle"
          onPress={() => this.props.navigation.navigate('NoteView')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    fontSize: 64,
    color: '#428bca',
  },
});
