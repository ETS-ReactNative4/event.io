import React from 'react';
import Navigator from './Navigator';

class App extends React.Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }
  render() {
    return <Navigator />;
  }
}
export default App;
