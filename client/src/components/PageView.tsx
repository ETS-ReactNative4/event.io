import React from 'react';
import { View, StyleSheet } from 'react-native';
export default function PageView(props) {
  return <View style={[style.main, props.style]}>{props.children}</View>;
}
const style = StyleSheet.create({
  main: {
    paddingTop: '2%',
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingBottom: '2%',
  },
});
