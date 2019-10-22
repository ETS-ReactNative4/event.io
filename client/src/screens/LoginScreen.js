import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import PageView from '../components/PageView';
import AuthContext from '../context/AuthContext';
import credentials from '../auth/credentials';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };
  static contextType = AuthContext;

  onLogin = async () => {
    const { auth0 } = this.context;
    let credentials, userInfo;
    const res = await fetch('http://192.168.1.5:3000/test');
    const data = await res.text();
    console.log(data);
    return;

    try {
      // get credentials
      credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
        // prompt: 'login',
        audience: 'https://hiddennotes/api',
      });
      // get userInfo
      userInfo = await auth0.auth.userInfo({
        token: credentials.accessToken,
      });
      const userPostReq = await fetch('http://localhost:3001/api/user', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials.accessToken}`,
        },
        body: JSON.stringify(userInfo),
      });
    } catch (err) {
      console.log('Authentication error', err);
      return;
    }

    // set token
    this.context.setState({ token: credentials.accessToken });
    AsyncStorage.setItem('token', credentials.accessToken);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={{
            flex: 1,
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}
          source={{
            uri:
              'http://img00.deviantart.net/7b50/i/2009/278/c/e/generic_glowy_wallpaper_by_dividedbyzero.jpg',
          }}
        />

        <Text
          style={{
            fontSize: 64,
            marginTop: '50%',
            marginLeft: '10%',
            marginBottom: '15%',
          }}>
          Hidden Notes
        </Text>
        <View style={styles.loginContainer}>
          <TouchableOpacity style={styles.loginBtn} onPress={this.onLogin}>
            <Text style={styles.loginTxt}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: '75%',
    flex: 1,
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtn: {
    padding: '3%',
    backgroundColor: 'black',
    marginLeft: 'auto',
    marginRight: '15%',
    borderRadius: 12,
  },
  loginTxt: {
    color: 'white',
    fontSize: 22,
  },
});

export default LoginScreen;
