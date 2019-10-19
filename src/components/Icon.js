import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';

export default function Icon(props) {
  const prefix = Platform.OS === 'ios' ? 'ios' : 'md';
  return <Ionicon {...props} name={`${prefix}-${props.name}`} />;
}
