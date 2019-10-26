import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = React.createContext({
  user: null,
  token: null,
  loggedIn: false,
  get: async () => {},
  refresh: async () => {},
  login: async () => {},
  logout: async () => {},
});

export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      token: null,
      loggedIn: false,
      getToken: async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          return token;
        } catch (err) {
          console.log(
            'Error getting token from AsyncStorage',
            JSON.stringify(err, null, 2),
          );
          return null;
        }
      },
      saveToken: async token => {
        try {
          await AsyncStorage.setItem('token', token);
          return true;
        } catch (err) {
          console.log(
            'Error saving token to AsyncStorage',
            JSON.stringify(err, null, 2),
          );
          return false;
        }
      },
      get: async (url, options = {}) => {
        options.headers = options.headers
          ? (options.headers = {
              ...options.headers,
              Authorization: `Bearer ${this.state.token}`,
            })
          : (options.headers = {
              Authorization: `Bearer ${this.state.token}`,
            });
        const res = await fetch(url, options);
        return res;
      },
      refresh: async token => {
        const response = await fetch('http://localhost:3000/auth/refresh', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token }),
        });
        if (response.ok) {
          const data = await response.json();
          try {
            await this.state.saveToken(data.token);
            this.setState({
              token: data.token,
              user: data.user,
              loggedIn: true,
            });
            return true;
          } catch (err) {
            console.log(err);
            return false;
          }
        } else {
          return false;
        }
      },
      login: async (email, password) => {
        const res = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          const err = await AsyncStorage.setItem('token', data.token);
          if (err) {
            console.log('Error saving token', error);
            return false;
          } else {
            this.setState({
              token: data.token,
              loggedIn: true,
              user: data.user,
            });
            return true;
          }
        } else {
          console.log('login response was not ok');
          return false;
        }
      },
      logout: async () => {
        await AsyncStorage.removeItem('token');
        this.setState({ token: null, user: null, loggedIn: false });
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
