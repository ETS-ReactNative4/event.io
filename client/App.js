import React from 'react';
import HiddenNotesApp from './src/HiddenNotesApp';
import { AuthProvider } from './src/context/AuthContext';
import { PostProvider } from './src/context/PostContext';
import { FriendsProvider } from './src/context/FriendsContext';
class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <FriendsProvider>
          <PostProvider>
            <HiddenNotesApp />
          </PostProvider>
        </FriendsProvider>
      </AuthProvider>
    );
  }
}

export default App;
