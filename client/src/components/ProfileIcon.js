import React, { useState } from 'react';
import { FriendsContext } from '../context/FriendsContext';
import Icon from '../components/Icon';
import Badge from '../components/Badge';
import { View } from 'react-native';

export default class ProfileIcon extends React.Component {
  static contextType = FriendsContext;

  getSpacing() {
    const { requests } = this.context;
    const count = requests.length;
    if (count > 99) {
      return -24;
    } else if (count > 9) {
      return -12;
    } else {
      return -8;
    }
  }

  render() {
    const { requests } = this.context;
    const count = requests.length;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {count > 0 && (
          <Badge
            size={18}
            textStyle={count < 9 && { padding: 0 }}
            text={count >= 99 ? '99+' : count}
            bgStyle={{
              top: -6,
              right: this.getSpacing(),
              position: 'absolute',
            }}
          />
        )}
        <Icon {...this.props} name="contact" />
      </View>
    );
  }
}
