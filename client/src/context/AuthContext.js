import React, { Component } from 'react';

const AuthContext = React.createContext();

export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      token: null,
      loggedIn: false,
      login: async (email, password) => {
        const token = await fetch('http://localhost:3000/auth/login', {
          method: 'post',
          body: JSON.stringify({ email, password }),
        });
        this.setState({ token });
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
