import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AuthContext from '../context/AuthContext';
import BaseTextInput from '../components/BaseTextInput';
import ImagePage from '../components/ImagePage';
import FormGroup from '../components/FormGroup';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };
  static contextType = AuthContext;

  onLogin = async () => {};

  render() {
    return (
      <ImagePage src="https://www.pixelstalk.net/wp-content/uploads/2016/11/Betta-Fish-Wallpaper-iOS-10.jpg">
        <View style={styles.loginContainer}>
          <FormGroup label="Email:" placeholder="example@example.com" />
          <FormGroup label="Password:" secureTextEntry={true} />
          <View>
            <Text style={styles.loginBtn} onPress={this.onLogin} title="Login">
              Login
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10%',
              }}>
              <Text style={{ color: 'white' }}>New here? </Text>
              <Text
                onPress={() => this.props.navigation.navigate('Register')}
                style={{ color: 'salmon' }}>
                Register
              </Text>
            </View>
          </View>
        </View>
      </ImagePage>
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5%',
  },
  loginBtn: {
    color: 'white',
    borderRadius: 29,
    padding: '2%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 12,
    fontSize: 18,
  },
  loginTxt: {
    color: 'white',
    fontSize: 18,
  },
});

export default LoginScreen;
