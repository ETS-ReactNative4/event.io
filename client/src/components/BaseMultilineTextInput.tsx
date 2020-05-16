import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
export default function BaseMultilineTextInput(props) {
  const maxLength = 100000;
  return (
    <TextInput
      keyboardAppearance="dark"
      selectionColor="indigo"
      multiline={true}
      blurOnSubmit={true}
      style={[styles.text, props.style]}
      {...props}
      maxLength={maxLength}>
      {props.text}
    </TextInput>
  );
}

const styles = StyleSheet.create({
  text: {
    elevation: 0,
    zIndex: 0,
    fontSize: 16,
  },
});
