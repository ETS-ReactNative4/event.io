import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PageView from '../components/PageView';

export default class NoteDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.post.title,
    };
  };

  render() {
    const { post } = this.props.navigation.state.params;
    return (
      <PageView>
        <Text style={styles.title}>{post.title}</Text>
        <Text>Posted by: {post.userId}</Text>
        <Text style={styles.body}>{post.body}</Text>
      </PageView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginBottom: '10%',
  },
  body: {},
});
