import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import Navigator from './components/Navigator';

class App extends React.Component {
  render() {
    return (
      <View style={styles.innerView}>
        <Navigator />
      </View>
    );
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
