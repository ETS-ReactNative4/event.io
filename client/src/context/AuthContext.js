import React, { Component } from 'react';
import Auth0 from 'react-native-auth0';
import credentials from '../auth/credentials';

const AuthContext = React.createContext();

export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    const auth = new Auth0(credentials);
    this.state = {
      auth0: auth,
      user: null,
      token: null,
      loggedIn: false,
      setState: state => {
        this.setState(state);
      },
    };
  }
  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
export const AuthConsumer = AuthContext.Consumer;
export default AuthContext;
