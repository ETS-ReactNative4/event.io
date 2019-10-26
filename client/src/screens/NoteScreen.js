import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import Slider from 'react-native-slider';
import BaseMultiLineTextInput from '../components/BaseMultilineTextInput';
import BaseTextInput from '../components/BaseTextInput';
import PageView from '../components/PageView';
import OptionsBar from '../components/OptionsBar';

export default class NoteView extends React.Component {
  static navigationOptions = {
    title: 'Post',
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
        this.setState({ expiryDate: '1 day' });
        break;
      }
      case 2: {
        this.setState({ expiryDate: '3 days' });
        break;
      }
      case 3: {
        this.setState({ expiryDate: '5 days' });
        break;
      }
      case 4: {
        this.setState({ expiryDate: '7 days' });
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
      <View style={styles.background}>
        <PageView style={styles.background}>
          <BaseTextInput
            placeholder="Title"
            style={styles.titleContainer}
            onChangeText={this.props.onTitleChange}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 'auto',
            }}>
            <Text style={[styles.expiryLabel, { marginRight: 12 }]}>
              Public
            </Text>
            <Switch value={true} />
          </View>
          <BaseMultiLineTextInput
            returnKeyType="done"
            style={styles.bodyContainer}
            placeholder="Enter text here."
            onChangeText={this.props.onBodyChange}
            onContentSizeChange={this.onBodySizeChange}
            onEndEditing={this.props.onBodyEndEditing}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.expiryLabel}>
              Expires in {this.state.expiryDate}
            </Text>
            <Slider
              style={{ flex: 1 }}
              onValueChange={this.onExpiryDateChange}
              step={1}
              maximumValue={4}
            />
          </View>
        </PageView>
        <OptionsBar
          rightIconName="camera"
          onRightPress={() => this.props.navigation.navigate('Camera')}
        />
      </View>
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
