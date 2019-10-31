import React, { Component } from 'react';
import { LayoutAnimation, ScrollView, Text, View, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import ImagePage from '../components/ImagePage';
import img from '../assets/login.jpeg';
import FadeIn from '../components/animated/FadeIn';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

class LoginScreen extends Component {
  static contextType = AuthContext;
  static navigationOptions = {
    header: null,
  };

  state = {
    login: true,
  };

  login = async (email, pass) => {
    const success = await this.context.login(email, pass);
    success
      ? this.props.navigation.navigate('App')
      : Alert.alert('Unauthorized', 'Email or password are incorrenct');
  };

  register = async (email, password, username) => {
    const res = await fetch('http://localhost:3000/auth/register', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    });
    res.ok ? this.toggleLogin() : Alert.alert('Error Registering');
  };

  toggleLogin = () => {
    LayoutAnimation.easeInEaseOut();
    this.setState({ login: !this.state.login });
  };

  render() {
    return (
      <ImagePage src={img}>
        <ScrollView
          contentContainerStyle={{
            zIndex: 1,
            justifyContent: 'center',
            flex: 1,
          }}>
          <FadeIn>
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
          </FadeIn>
        </ScrollView>
      </ImagePage>
    );
  }
}
export default LoginScreen;
