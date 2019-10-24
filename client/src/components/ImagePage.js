import React from 'react';
import { View, Image } from 'react-native';

export default function ImagePage(props) {
  return (
    <View
      style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>
      <Image
        style={{
          flex: 1,
          position: 'absolute',
          height: '100%',
          width: '100%',
        }}
        source={{ uri: props.src }}
      />
      {props.children}
    </View>
  );
}
