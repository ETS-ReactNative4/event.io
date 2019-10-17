import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Voice from 'react-native-voice';

export default class OptionsBar extends React.Component {
  state = {
    voiceAvailable: false,
  };
  componentDidMount = () => {
    Voice.isAvailable().then(val => {
      this.setState({ voiceAvailable: val });
    });
  };
  render() {
    // Icons
    const prefix = Platform.OS === 'ios' ? 'ios' : 'md';
    const recordIcon = this.props.recording ? (
      <TouchableOpacity style={styles.btn} onPress={this.props.onStopRecording}>
        <Icon style={styles.icon} name={`${prefix}-square`} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={styles.btn}
        onPress={this.props.onStartRecording}>
        <Icon style={styles.icon} name={`${prefix}-radio-button-on`} />
      </TouchableOpacity>
    );
    const saveIcon = (
      <TouchableOpacity style={styles.btn} onPress={this.props.onSave}>
        <Icon style={styles.icon} name={'md-pin'} />
      </TouchableOpacity>
    );
    const cameraIcon = (
      <TouchableOpacity style={styles.btn} onPress={this.props.onCamera}>
        <Icon style={styles.icon} name={`${prefix}-camera`} />
      </TouchableOpacity>
    );
    // Out
    return (
      <View style={styles.optionsBar}>
        {this.state.voiceAvailable && recordIcon}
        {cameraIcon}
        {saveIcon}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    fontSize: 32,
    width: 32,
    color: '#393f4d',
  },
  btn: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  optionsBar: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    elevation: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
});
