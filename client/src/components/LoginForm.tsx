import React, { Component } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmit from './FormSubmit';

export default class LoginForm extends Component {
  static contextType = AuthContext;

  render() {
    return (
      <FormContainer>
        <FormInput
          label="Email:"
          placeholder="example@example.com"
          autoCompleteType="email"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={email => (this.email = email)}
        />
        <FormInput
          label="Password:"
          secureTextEntry={true}
          onChangeText={pass => (this.pass = pass)}
        />
        <FormSubmit
          onPress={() => this.props.onLogin(this.email, this.pass)}
          text="Login"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10%',
          }}>
          <Text style={{ color: 'white' }}>New here? </Text>
          <Text
            onPress={this.props.onNavigateToRegister}
            style={{ color: 'salmon' }}>
            Sign up!
          </Text>
        </View>
      </FormContainer>
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
    color: 'lightcyan',
    marginLeft: 'auto',
    marginRight: '12.5%',

    padding: 6,
    marginTop: 12,
    fontSize: 18,
  },
  loginTxt: {
    color: 'white',
    fontSize: 18,
  },
});
