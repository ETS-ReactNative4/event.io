import React, { useState } from 'react'
import BaseMultiLineTextInput from './BaseMultilineTextInput'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text
} from 'react-native'

export default function BasePostForm({ children, onSubmit }) {
  const [body, setBody] = useState('')
  return (
    <View style={{ flex: 1 }}>
      {children}
      {/* <FeedInfo feed={feed} /> */}
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <View style={{ padding: 24, flex: 1 }}>
          <BaseMultiLineTextInput
            autoFocus={true}
            returnKeyType='done'
            style={styles.bodyContainer}
            placeholder='Enter text here.'
            onChangeText={text => setBody(text)}
          />
          <TouchableOpacity
            onPress={() => onSubmit(body)}
            style={styles.button}
          >
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
