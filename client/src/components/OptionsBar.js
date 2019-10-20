import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from './Icon';

export default class OptionsBar extends React.Component {
  render() {
    // Icons
    const leftButton = (
      <TouchableOpacity style={styles.btn} onPress={this.props.onLeftPress}>
        <Icon style={styles.icon} name={this.props.leftIconName} />
      </TouchableOpacity>
    );
    const centerButton = (
      <TouchableOpacity style={styles.btn} onPress={this.props.onCenterPress}>
        <Icon style={styles.icon} name={this.props.centerIconName} />
      </TouchableOpacity>
    );
    const rightButton = (
      <TouchableOpacity style={styles.btn} onPress={this.props.onRightPress}>
        <Icon style={styles.icon} name={this.props.rightIconName} />
      </TouchableOpacity>
    );
    // Out
    return (
      <View style={styles.optionsBar}>
        {leftButton}
        {centerButton}
        {rightButton}
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
