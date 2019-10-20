import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Icon from '../components/Icon';
import Geolocation from '@react-native-community/geolocation';
import OptionsBar from '../components/OptionsBar';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Explore',
  };
  state = {
    posts: [],
    position: {
      longitude: -122,
      latitude: 32,
    },
  };
  componentDidMount = () => {
    fetch('http://localhost:3001/api/posts').then(res => {
      res.json().then(data => {
        console.log('DATA', data);
      });
    });
    Geolocation.getCurrentPosition(
      pos => {
        this.setState({
          position: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
        });
      },
      err => console.error(err),
      {
        enableHighAccuracy: true,
      },
    );
    // fill in posts
    fetch('https://jsonplaceholder.typicode.com/posts').then(res => {
      res.json().then(data => {
        for (let d of data) {
          d.pos = {
            longitude:
              this.state.position.longitude + 0.02 * (Math.random() - 0.5),
            latitude:
              this.state.position.latitude + 0.02 * (Math.random() - 0.5),
          };
        }
        this.setState({ posts: data });
      });
    });
  };

  center = () => {
    this.map.animateToRegion(this.state.position, 500);
  };
  render() {
    const { position } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={map => (this.map = map)}
          style={{ height: '100%', width: '100%', flex: 1 }}
          region={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.00522,
            longitudeDelta: 0.00521,
          }}
          showsUserLocation={true}
          showsBuildings={false}
          pitchEnabled={false}
          userLocationAnnotationTitle="Me">
          {this.state.posts.map(post => {
            return (
              <Marker
                key={post.id}
                coordinate={post.pos}
                pinColor="darkseagreen">
                <Callout
                  tooltip={true}
                  onPress={() =>
                    this.props.navigation.navigate('NoteDetails', {
                      post,
                    })
                  }>
                  <Text style={styles.callout}>{post.title}</Text>
                </Callout>
              </Marker>
            );
          })}
          <Icon
            style={styles.icon}
            onPress={() => this.props.navigation.navigate('Note')}
            name="add-circle"
          />
        </MapView>
        <OptionsBar
          centerIconName="locate"
          onCenterPress={this.center}
          leftIconName="menu"
          rightIconName="contact"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  callout: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    fontSize: 64,
    zIndex: 2,
    // color: '#428bca',
    color: 'black',
  },
});
