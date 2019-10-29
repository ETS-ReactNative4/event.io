import React from 'react';
import HiddenNotesApp from './src/HiddenNotesApp';
import { AuthProvider } from './src/context/AuthContext';
import { FriendRequestProvider } from './src/context/FriendRequestContext';
class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <FriendRequestProvider>
          <HiddenNotesApp />
        </FriendRequestProvider>
      </AuthProvider>
    );
  }
}

export default App;
