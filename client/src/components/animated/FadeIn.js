import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

export default function FadeIn({ style, duration, children }) {
  [fadeIn] = useState(new Animated.Value(0));
  React.useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: duration || 1000,
    }).start();
  });

  return (
    <Animated.View style={{ ...style, opacity: fadeIn }}>
      {children}
    </Animated.View>
  );
}
