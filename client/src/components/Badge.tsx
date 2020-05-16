import React from 'react';
import { View, Text } from 'react-native';

export default Badge = ({
  bgStyle,
  textStyle,
  text,
  badgeColor,
  textColor,
  size,
}) => {
  const styles = {
    container: {
      backgroundColor: badgeColor || '#5cb85c',
      zIndex: 100,
      borderRadius: 100,
      minWidth: size || 22,
      minHeight: size || 22,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      textAlign: 'center',
      padding: 3,
      zIndex: 101,
      color: textColor || 'white',
      fontWeight: 'bold',
      fontSize: 12,
    },
  };
  return (
    <View style={[styles.container, bgStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};
