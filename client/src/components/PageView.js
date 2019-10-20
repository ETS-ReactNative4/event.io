import React from 'react';
import { View, StyleSheet } from 'react-native';
export default function PageView(props) {
  return <View style={[style.main, props.style]}>{props.children}</View>;
}
const style = StyleSheet.create({
  main: {
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '5%',
  },
});
