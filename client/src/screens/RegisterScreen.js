import React, { Component } from 'react';
import ImagePage from '../components/ImagePage';
import { Button, View, StyleSheet } from 'react-native';
import FormGroup from '../components/FormInput';
import img from '../assets/register.jpg';
export default class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'Register',
  };

  register = async () => {
    const { email, password, username } = this;
    console.log(email, password, username);
    if (password !== this.confirmPassword)
      return console.log('Passwords must match');
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
    if (res.ok) {
      this.props.navigation.navigate('Login');
      const data = await res.json();
      console.log(data);
    } else {
      console.log('error registering');
      const data = await res.json();
      console.log(data);
    }
  };
  render() {
    return (
      <ImagePage src={img}>
        <View style={styles.container}>
          <FormGroup
            label="Email"
            placeholder="example@example.com"
            onChangeText={email => (this.email = email)}
          />
          <FormGroup
            label="Username"
            onChangeText={username => (this.username = username)}
          />
          <FormGroup
            label="Password"
            secureTextEntry
            onChangeText={password => (this.password = password)}
          />
          <FormGroup
            label="Confirm Password"
            secureTextEntry
            onChangeText={confirmPassword =>
              (this.confirmPassword = confirmPassword)
            }
          />
          <Button title="Register" onPress={this.register} />
        </View>
      </ImagePage>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5%',
  },
});
