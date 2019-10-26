import React from 'react';
import AuthContext from '../context/AuthContext';

export default class LoadingScreen extends React.Component {
  static contextType = AuthContext;
  async componentDidMount() {
    const token = await this.context.getToken();
    if (token) {
      const success = await this.context.refresh(token);
      console.log(success);
      success
        ? this.props.navigation.navigate('App')
        : this.props.navigation.navigate('Auth');
    } else {
      this.props.navigation.navigate('Auth');
    }
  }
  render = () => null;
}
