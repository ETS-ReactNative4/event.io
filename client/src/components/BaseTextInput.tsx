import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function BaseTextInput(props) {
  return (
    <TextInput
      {...props}
      maxLength={50}
      clearButtonMode="while-editing"
      keyboardAppearance="dark"
      selectionColor="indigo"
      style={[styles.text, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
