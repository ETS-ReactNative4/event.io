import React, { Component } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import BaseTextInput from '../components/BaseTextInput';
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

  _onLogin = () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email',
      })
      .then(credentials => {
        Alert.alert('AccessToken: ' + credentials.accessToken);
        this.setState({ accessToken: credentials.accessToken });
      })
      .catch(error => console.log(error));
  };

  _onLogout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        Alert.alert('Logged out!');
        this.setState({ accessToken: null });
      })
      .catch(error => {
        console.log('Log out cancelled');
      });
  };

  render() {
    return (
      <PageView style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.header}>Login</Text>
          <BaseTextInput
            autoCompleteType="username"
            style={styles.input}
            placeholder="Username"
          />
          <BaseTextInput
            secureTextEntry={true}
            autoCompleteType="password"
            style={styles.input}
            placeholder="Password"
          />
          <TouchableOpacity style={styles.loginBtn} onPress={this._onLogin}>
            <Text style={styles.loginTxt}>Log In</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Don't have an account?</Text>
            <Button title="Sign Up" />
          </View>
        </View>
      </PageView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    flex: 1,
  },
  loginContainer: {},
  header: {
    fontSize: 32,
    marginBottom: 64,
  },
  input: {
    paddingBottom: '5%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  loginBtn: {
    padding: '3%',
    backgroundColor: 'lightblue',
    borderRadius: 12,
  },
  loginTxt: {
    fontSize: 16,
    //color: 'white',
  },
});

export default Login;
