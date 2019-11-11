import React, { useState, useEffect, useContext } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import BaseMultiLineTextInput from '../components/BaseMultilineTextInput';
import PostListItemContainer from '../components/PostListItemContainer';
import { PostContext } from '../context/PostContext';

PostScreen.navigationOptions = {
  title: 'Post',
};
export default function PostScreen({ navigation }) {
  const { fetchFeeds, createPost, createComment } = useContext(PostContext);
  const [body, setBody] = useState('');

  const onSubmit = () => {
    if (!body) return Alert.alert('Posts cannot be empty');
    const feed = navigation.getParam('feed', null);
    const post = navigation.getParam('post', null);

    if (feed) {
      createPost(feed._id, { body });
      fetchFeeds();
      navigation.goBack();
    } else if (post) {
      createComment(post._id, { body });
      fetchFeeds();
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {navigation.getParam('post', null) && (
        <View>
          <PostListItemContainer
            post={navigation.getParam('post')}
            showOptions={false}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'lightgray',
            }}></View>
        </View>
      )}
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 24, flex: 1 }}>
          <BaseMultiLineTextInput
            autoFocus={true}
            returnKeyType="done"
            style={styles.bodyContainer}
            placeholder="Enter text here."
            onChangeText={text => setBody(text)}
          />
          <TouchableOpacity onPress={onSubmit} style={styles.button}>
            <Text style={styles.buttonLabel}>Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    marginBottom: 100,
    marginLeft: 'auto',
    borderRadius: 6,
    backgroundColor: 'lightgray',
  },
  buttonLabel: {
    fontSize: 16,
    color: '#333',
  },
  background: {},
  expiryLabel: {
    fontStyle: 'italic',
    marginBottom: 24,
  },
  bodyContainer: { flex: 1 },
});
