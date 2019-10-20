import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PageView from '../components/PageView';
import Auth0 from 'react-native-auth0';
var credentials = require('../auth/credentials');
const auth0 = new Auth0(credentials);

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };
  constructor(props) {
    super(props);
    this.state = { accessToken: null };
  }

  onLogin = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
      });
      const userInfo = await auth0.auth.userInfo({
        token: credentials.accessToken,
      });
      this.setState({ accessToken: credentials.accessToken, userInfo });
      this.props.navigation.replace('Explore');
    } catch (err) {
      console.log('Authentication error', err);
    }
  };

  render() {
    return (
      <PageView style={styles.container}>
        <View style={styles.loginContainer}>
          <TouchableOpacity style={styles.loginBtn} onPress={this.onLogin}>
            <Text style={styles.loginTxt}>Log In</Text>
          </TouchableOpacity>
        </View>
      </PageView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444',
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtn: {
    padding: '3%',
    backgroundColor: 'black',
    borderRadius: 12,
  },
  loginTxt: {
    color: 'white',
    fontSize: 32,
  },
});

export default Login;
