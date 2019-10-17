import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from 'react-native-slider';
import BaseMultiLineTextInput from './BaseMultilineTextInput';
import BaseTextInput from './BaseTextInput';
import PageView from './PageView';
import OptionsBar from './OptionsBar';

export default class NoteView extends React.Component {
  static navigationOptions = {
    title: 'Notes',
  };

  state = {
    title: 'Untitled',
    body: '',
    expiryDate: '30m',
  };

  onExpiryDateChange = e => {
    switch (e) {
      case 0: {
        this.setState({ expiryDate: '30m' });
        break;
      }
      case 1: {
        this.setState({ expiryDate: '1 Day' });
        break;
      }
      case 2: {
        this.setState({ expiryDate: '3 Days' });
        break;
      }
      case 3: {
        this.setState({ expiryDate: '5 Days' });
        break;
      }
      case 4: {
        this.setState({ expiryDate: '7 Days' });
        break;
      }
    }
  };
  onBodySizeChange = e => {
    const height = e.nativeEvent.contentSize.height;
    console.log('height', height);
  };
  render() {
    return (
      <PageView style={styles.background}>
        <BaseTextInput
          placeholder="Title"
          style={styles.titleContainer}
          onChangeText={this.props.onTitleChange}
        />
        <BaseMultiLineTextInput
          returnKeyType="done"
          style={styles.bodyContainer}
          placeholder="Enter text here."
          onChangeText={this.props.onBodyChange}
          onContentSizeChange={this.onBodySizeChange}
          onEndEditing={this.props.onBodyEndEditing}
        />
        <Text style={styles.expiryLabel}>
          Expires In {this.state.expiryDate}
        </Text>
        <Slider
          onValueChange={this.onExpiryDateChange}
          step={1}
          maximumValue={4}
        />
        <OptionsBar
          onCamera={() => this.props.navigation.navigate('CameraView')}
        />
      </PageView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1,
  },
  expiryLabel: {
    fontStyle: 'italic',
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    backgroundColor: 'white',
    paddingBottom: '5%',
  },
  bodyContainer: {
    flex: 1,
  },
});
