import React, { useState, useEffect } from 'react'
import { Animated, View } from 'react-native'

export default function FadeIn({ duration, children }) {
  ;[fadeIn] = useState(new Animated.Value(0))
  React.useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: duration || 1000
    }).start()
  })

  return (
    <Animated.View style={{ flex: 1, opacity: fadeIn }}>
      {children}
    </Animated.View>
  )
}
