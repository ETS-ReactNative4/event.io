import React, { useState, useEffect, useContext } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import BaseMultiLineTextInput from '../components/BaseMultilineTextInput';
import { AuthContext } from '../context/AuthContext';
import PostListItemContainer from '../components/PostListItemContainer';
import { PostContext } from '../context/PostContext';
import Geolocation from '@react-native-community/geolocation';

PostScreen.navigationOptions = {
  title: 'Post',
};

export default function PostScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const { setPost, fetchFeed, fetchProfile } = useContext(PostContext);
  const [body, setBody] = useState('');

  const onSubmit = () => {
    Geolocation.getCurrentPosition(async position => {
      if (!body) return console.log('must provide title and body');
      const post = navigation.getParam('post', null);
      const url = post ? `/posts/${post._id}` : '/posts';
      const res = await authCtx.get(url, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          body,
          public: true,
          location: {
            latitude: position.coords.latitude + (Math.random() - 0.5) * 0.005,
            longitude:
              position.coords.longitude + (Math.random() - 0.5) * 0.005,
          },
        }),
      });
      if (res.ok) {
        try {
          const data = await res.json();
          setPost(data._id, data);
          if (!post) {
            fetchFeed();
            fetchProfile(authCtx.user.uid);
          }
          navigation.goBack();
        } catch (err) {
          console.log(err);
        }
      } else [console.log('Error: Server resoonded with status', res.status)];
    });
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
