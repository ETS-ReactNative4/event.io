import React, { useState, useContext } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Alert, KeyboardAvoidingView } from 'react-native'
import BaseMultiLineTextInput from '../components/BaseMultilineTextInput'
import { PostContext } from '../context/PostContext'
import FeedInfo from '../components/FeedInfo'

CreatePostScreen.navigationOptions = {
  title: 'Create Post'
}
export default function CreatePostScreen({ navigation }) {
  const { createPost, createComment } = useContext(PostContext)
  const [body, setBody] = useState('')
  const feed = navigation.getParam('feed', null)

  const onSubmit = () => {
    if (!body) return Alert.alert('Posts cannot be empty')
    if (feed) {
      createPost(feed._id, { body })
      navigation.goBack()
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <FeedInfo feed={feed} />
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <View style={{ padding: 24, flex: 1 }}>
          <BaseMultiLineTextInput
            autoFocus={true}
            returnKeyType='done'
            style={styles.bodyContainer}
            placeholder='Enter text here.'
            onChangeText={text => setBody(text)}
          />
          <TouchableOpacity onPress={onSubmit} style={styles.button}>
            <Text style={styles.buttonLabel}>Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    marginBottom: 100,
    marginLeft: 'auto',
    borderRadius: 6
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  background: {},
  expiryLabel: {
    fontStyle: 'italic',
    marginBottom: 24
  },
  bodyContainer: { flex: 1 }
})
