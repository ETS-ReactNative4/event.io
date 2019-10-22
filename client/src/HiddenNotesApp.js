import React from 'react';
import { StyleSheet, View } from 'react-native';
import Navigator from './Navigator';

class App extends React.Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return <Navigator />;
  }
}
const styles = StyleSheet.create({
  navigator: {
    flex: 0,
    height: 0,
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
  },
  innerView: {
    flex: 1,
  },
});
export default App;
