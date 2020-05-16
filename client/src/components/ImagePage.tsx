import React from 'react';
import { View, Image } from 'react-native';
export default function ImagePage(props) {
  return (
    <View
      style={[
        { flex: 1, justifyContent: 'center', backgroundColor: 'black' },
        props.style,
      ]}>
      <Image
        style={{
          flex: 1,
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: 0.3,
        }}
        source={props.src}
      />
      {props.children}
    </View>
  );
}
