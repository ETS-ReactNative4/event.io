import React from 'react';
import { View, StyleSheet } from 'react-native';
export default function PageView(props) {
  return <View style={[style.main, props.style]}>{props.children}</View>;
}
const style = StyleSheet.create({
  main: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
  },
});
