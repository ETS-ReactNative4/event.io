import React from 'react';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmit from './FormSubmit';
import { View, Text, Alert } from 'react-native';

export default class RegisterForm extends React.Component {
  validate = () => {
    if (this.password !== this.confirmPassword) {
      return Alert.alert('Passwords must match');
    } else {
      this.props.onRegister(this.email, this.username, this.password);
    }
  };

  render() {
    return (
      <FormContainer>
        <FormInput
          label="Email"
          placeholder="example@example.com"
          onChangeText={email => (this.email = email)}
        />
        <FormInput
          label="Username"
          onChangeText={username => (this.username = username)}
        />
        <FormInput
          label="Password"
          secureTextEntry
          onChangeText={password => (this.password = password)}
        />
        <FormInput
          label="Confirm Password"
          secureTextEntry
          onChangeText={confirmPassword =>
            (this.confirmPassword = confirmPassword)
          }
        />
        <FormSubmit onPress={this.validate} text="Register" />
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10%',
            }}>
            <Text style={{ color: 'white' }}>Already have an account? </Text>
            <Text
              onPress={this.props.onNavigateToLogin}
              style={{ color: 'salmon' }}>
              Sign In
            </Text>
          </View>
        </View>
      </FormContainer>
    );
  }
}
