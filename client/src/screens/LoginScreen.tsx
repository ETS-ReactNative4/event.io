import React, { Component, useContext } from 'react'
import {
  LayoutAnimation,
  ScrollView,
  Text,
  View,
  Alert,
  KeyboardAvoidingView
} from 'react-native'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { useAuth } from '../hooks/useAuth'

function LoginScreen({ navigation }) {
  const auth = useAuth()
  const [loginFormDisplay, setLoginFormDisplay] = useState(true)

  const handleLogin = async (email, pass) => {
    const success = await auth.login(email, pass)
    if (success) {
      navigation.navigate('App')
    } else {
      Alert.alert('Unauthorized', 'Email or password are incorrenct')
    }
  }

  const handleRegister = async (email, password, username) => {
    const success = await auth.register(email, password, username)
    success ? toggleLoginDisplay() : Alert.alert('Error Registering')
  }

  // moves between register and login form
  const toggleLoginDisplay = () => {
    LayoutAnimation.easeInEaseOut()
    setLoginFormDisplay(!loginFormDisplay)
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{ backgroundColor: 'indigo', flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          zIndex: 1,
          justifyContent: 'center',
          flex: 1
        }}
      >
        <View style={{ marginLeft: '12.5%', width: '75%' }}>
          <Text style={{ color: 'white', fontSize: 32, marginBottom: 32 }}>
            {loginFormDisplay ? 'Sign in' : 'Sign up'}
          </Text>
        </View>
        {this.state.login ? (
          <LoginForm
            onLogin={handleLogin}
            onNavigateToRegister={toggleLoginDisplay}
          />
        ) : (
          <RegisterForm
            onRegister={handleRegister}
            onNavigateToLogin={toggleLoginDisplay}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
export default LoginScreen
