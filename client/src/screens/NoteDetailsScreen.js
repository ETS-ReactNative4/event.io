import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import PageView from '../components/PageView';
import Avatar from '../components/Avatar';
export default class NoteDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.post.title,
    };
  };

  render() {
    const { post } = this.props.navigation.state.params;
    return (
      <ScrollView>
        <PageView>
          <View style={styles.header}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Avatar rounded={false} user={post.author} size={64} />
              <Text style={styles.author}>{post.author.username}</Text>
            </View>
            <Text style={styles.title}>{post.title}</Text>
          </View>
          <Text style={styles.body}>{post.body}</Text>
        </PageView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  author: {
    fontSize: 10,
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 12,
    fontSize: 22,
  },
  body: {
    fontSize: 16,
  },
});
