import React, { Component, useContext } from 'react'
import {
  LayoutAnimation,
  ScrollView,
  Text,
  View,
  Alert,
  KeyboardAvoidingView
} from 'react-native'
import { AuthContext } from '../context/AuthContext'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

function LoginScreen() {
  const authContext = useContext(AuthContext)

  login = async (email, pass) => {
    const success = await authContext.login(email, pass)

    success
      ? this.props.navigation.navigate('App')
      : Alert.alert('Unauthorized', 'Email or password are incorrenct')
  }

  register = async (email, password, username) => {
    const res = await fetch('http://localhost:3000/auth/register', {
      headers: {
        'content-type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        email,
        password,
        username
      })
    })
    res.ok ? this.toggleLogin() : Alert.alert('Error Registering')
  }

  toggleLogin = () => {
    LayoutAnimation.easeInEaseOut()
    this.setState({ login: !this.state.login })
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
            {this.state.login ? 'Sign in' : 'Sign up'}
          </Text>
        </View>
        {this.state.login ? (
          <LoginForm
            onLogin={this.login}
            onNavigateToRegister={this.toggleLogin}
          />
        ) : (
          <RegisterForm
            onRegister={this.register}
            onNavigateToLogin={this.toggleLogin}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
export default LoginScreen
