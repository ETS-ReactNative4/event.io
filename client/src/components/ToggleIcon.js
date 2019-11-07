import React from 'react';
import Icon from './Icon';
import { TouchableOpacity } from 'react-native';

export default function ToggleIcon({
  style,
  name,
  onPress,
  active = false,
  activeColor = 'green',
  disabledColor = 'gray',
  disabled,
}) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Icon
        name={name}
        style={[style, { color: active ? activeColor : disabledColor }]}
      />
    </TouchableOpacity>
  );
}
