import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client';

const baseUrl = 'http://localhost:3000';

export const AuthContext = React.createContext();

export class AuthProvider extends Component {
  state = {
    user: null,
    token: null,
    socket: null,
    // get token from async storage
    getTokenFromStorage: async () => {
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
    // save token to async storage
    saveTokenToStorage: async token => {
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
    // authorized fetch request
    get: async (url, options = {}) => {
      options.headers = options.headers
        ? (options.headers = {
            ...options.headers,
            Authorization: `Bearer ${this.state.token}`,
            sid: this.state.socket.id,
          })
        : (options.headers = {
            Authorization: `Bearer ${this.state.token}`,
            sid: this.state.socket.id,
          });
      const res = await fetch(baseUrl + url, options);
      console.log('AuthContext::get::', url);
      return res;
    },
    // refresh token
    refreshToken: async token => {
      const response = await fetch(`${baseUrl}/auth/refresh`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
      });
      if (response.ok) {
        try {
          const data = await response.json();
          await this.state.saveTokenToStorage(data.token);
          const socket = io(baseUrl);
          socket.emit('authenticate', { token: data.token });

          this.setState({
            token: data.token,
            user: data.user,
            socket,
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
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        const err = await AsyncStorage.setItem('token', data.token);
        if (err) {
          console.log('Error saving token', error);
          return false;
        } else {
          // logged in successfully now connect to socket
          const socket = io(baseUrl);
          socket.emit('authenticate', { token: data.token });
          this.setState({ token: data.token, user: data.user, socket });
          return true;
        }
      } else {
        console.log('login response was not ok');
        return false;
      }
    },
    logout: async () => {
      this.state.socket.removeAllListeners();
      this.state.socket.disconnect();
      await AsyncStorage.removeItem('token');
      this.setState({ token: null, user: null, socket: null });
    },
  };

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
export const AuthConsumer = AuthContext.Consumer;
