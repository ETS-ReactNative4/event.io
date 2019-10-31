import React from 'react';
import HiddenNotesApp from './src/HiddenNotesApp';
import { AuthProvider } from './src/context/AuthContext';
import { FriendsProvider } from './src/context/FriendsContext';
class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <FriendsProvider>
          <HiddenNotesApp />
        </FriendsProvider>
      </AuthProvider>
    );
  }
}

export default App;
