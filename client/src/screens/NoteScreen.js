import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Switch } from 'react-native';
import Slider from 'react-native-slider';
import BaseMultiLineTextInput from '../components/BaseMultilineTextInput';
import PageView from '../components/PageView';
import { AuthContext } from '../context/AuthContext';

export default class NoteView extends React.Component {
  static contextType = AuthContext;
  static navigationOptions = {
    title: 'Post',
  };
  state = {
    title: '',
    body: '',
    expiryDate: '30m',
  };

  submitPost = async () => {
    if (!this.state.body) return console.log('must provide title and body');
    const post = this.props.navigation.getParam('post', null);
    const url = post ? `/posts/${post._id}` : '/posts';
    const res = await this.context.get(url, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body,
        public: true,
      }),
    });
    if (res.ok) {
      try {
        this.props.navigation.goBack();
      } catch (err) {
        console.log(err);
      }
    } else [console.log('Error: Server resoonded with status', res.status)];
  };

  canSubmit = () => {
    return this.state.body;
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

  render() {
    return (
      <View style={styles.background}>
        <PageView style={styles.background}>
          <BaseMultiLineTextInput
            returnKeyType="done"
            style={styles.bodyContainer}
            placeholder="Enter text here."
            onChangeText={text => this.setState({ body: text })}
          />
          <View>
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
          <TouchableOpacity
            disabled={!this.canSubmit()}
            onPress={this.submitPost}
            style={styles.button}>
            <Text style={styles.buttonLabel}>Share</Text>
          </TouchableOpacity>
        </PageView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    marginTop: 16,
    marginLeft: 'auto',
    borderRadius: 6,
    backgroundColor: '#0275d8',
  },
  buttonLabel: {
    fontSize: 16,
    color: 'white',
  },
  background: {
    backgroundColor: 'white',
    flex: 1,
  },
  expiryLabel: {
    fontStyle: 'italic',
    marginBottom: 24,
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
