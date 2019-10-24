import React, { Component } from 'react';
import ImagePage from '../components/ImagePage';
import { Text } from 'react-native';
export default class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'Register',
  };
  render() {
    return (
      <ImagePage src="https://www.pixelstalk.net/wp-content/uploads/2016/11/iPhone-Fish-Wallpapers.jpg"></ImagePage>
    );
  }
}
