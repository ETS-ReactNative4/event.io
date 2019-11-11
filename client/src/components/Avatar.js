import React from 'react';
import { Image } from 'react-native';

export default function Avatar({ rounded = true, user, size, style }) {
  console.log(user);
  const imgSource =
    user.picture ||
    `https://fakeimg.pl/${size}x${size}/333/?text=${user.username[0].toUpperCase()}&font=noto`;

  const radius = rounded ? 100 : 6;
  return (
    <Image
      width={size}
      height={size}
      style={[{ width: size, height: size, borderRadius: radius }, style]}
      source={{ uri: imgSource }}
    />
  );
}
