import React, { Component } from 'react';

const AuthContext = React.createContext();

export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      token: null,
      loggedIn: false,
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
      login: async (email, password) => {
        const res = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
          const token = await res.json();
          this.setState({ token: token.token, loggedIn: true });
          return true;
        } else {
          return false;
        }
      },
      logout: () => {
        this.setState({ token: null, user: null, loggedIn: false });
      },
      //
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
