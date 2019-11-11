import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Switch,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import BaseMultiLineTextInput from '../components/BaseMultilineTextInput';
import BaseTextInput from '../components/BaseTextInput';
import { PostContext } from '../context/PostContext';
import Geolocation from '@react-native-community/geolocation';

CreateFeedScreen.navigationOptions = {
  title: 'Create Feed',
};
export default function CreateFeedScreen({ navigation }) {
  const postCtx = useContext(PostContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setPublic] = useState(false);

  function onSubmit() {
    Geolocation.getCurrentPosition(position => {
      const audience = isPublic ? 'public' : 'friends';
      postCtx
        .createFeed({
          title,
          description,
          audience,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        })
        .then(result => {
          navigation.goBack();
        });
    });
  }

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
          <View style={{ flex: 1, marginTop: 24 }}>
            <BaseTextInput
              autoFocus={true}
              style={{
                fontSize: 16,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
              }}
              onChangeText={text => setTitle(text)}
              placeholder="Title"
            />
            <BaseMultiLineTextInput
              returnKeyType="done"
              style={{ fontSize: 16, flex: 1, paddingVertical: 12 }}
              placeholder="Description"
              onChangeText={text => setDescription(text)}
            />
          </View>
          <View
            style={{
              marginBottom: 100,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                }}>
                <Text
                  style={{
                    marginRight: 12,
                    color: '#333',
                    fontSize: 16,
                  }}>
                  Public
                </Text>
                <Switch
                  value={isPublic}
                  onValueChange={value => setPublic(value)}
                />
              </View>
              <Text style={{ color: 'gray' }}>
                {isPublic
                  ? 'Anyone can subscribe to the feed.'
                  : 'Only friends can subscribe.'}
              </Text>
            </View>
            <TouchableOpacity onPress={onSubmit} style={styles.button}>
              <Text style={styles.buttonLabel}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    padding: 12,
    marginLeft: 'auto',
    borderRadius: 6,
    //backgroundColor: 'lightgray',
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
