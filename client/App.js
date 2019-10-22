import React from 'react';
import HiddenNotesApp from './src/HiddenNotesApp';
import { AuthProvider } from './src/context/AuthContext';
class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <HiddenNotesApp />
      </AuthProvider>
    );
  }
}

export default App;
