import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView, Text } from 'react-native';
export default function LoadingScreen({ navigation }) {
  const auth = useContext(AuthContext);
  useEffect(() => {
    auth.getTokenFromStorage().then(token => {
      token
        ? auth.refreshToken(token).then(success => {
            success ? navigation.navigate('App') : navigation.navigate('Auth');
          })
        : navigation.navigate('Auth');
    });
  }, []);
  return (
    <SafeAreaView>
      <Text>Loading...</Text>
    </SafeAreaView>
  );
}
