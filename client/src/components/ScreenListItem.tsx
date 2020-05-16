import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from './Icon';

export default ScreenListItem = ({ children, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 16, marginRight: 6 }}>{text}</Text>
        {children}
        <Icon
          style={{ marginLeft: 'auto', fontSize: 16 }}
          name="arrow-dropright"></Icon>
      </View>
    </TouchableOpacity>
  );
};
