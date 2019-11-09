import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import Icon from '../components/Icon';
import Geolocation from '@react-native-community/geolocation';
import { PostContext } from '../context/PostContext';

ExploreScreen.navigationOptions = {
  title: 'Explore',
};
export default function ExploreScreen({ navigation }) {
  const { feed } = useContext(PostContext);
  const [position, setPosition] = useState({
    longitude: -122,
    latitude: 32,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      err => console.error(err),
      {
        enableHighAccuracy: true,
      },
    );
    return () => {};
  }, []);

  function center() {
    map.animateToRegion(position, 500);
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={map => (this.map = map)}
        style={{ height: '100%', width: '100%', flex: 1 }}
        region={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        }}
        showsUserLocation={true}
        showsBuildings={false}
        pitchEnabled={false}>
        <Circle
          radius={1000}
          center={position}
          strokeColor={'white'}
          fillColor={'rgba(200,200,248,0.5)'}
        />
        {feed &&
          feed.map(post => {
            return (
              <Marker
                key={post._id}
                coordinate={post.location}
                pinColor="darkseagreen">
                <Callout
                  tooltip={true}
                  onPress={() =>
                    navigation.navigate('NoteDetails', {
                      post,
                    })
                  }>
                  <Text style={styles.callout}>
                    {post.user.username} - {post.body}
                  </Text>
                </Callout>
              </Marker>
            );
          })}
        <Icon
          style={styles.icon}
          onPress={() => navigation.navigate('Post')}
          name="add-circle"
        />
        <Icon
          style={[styles.icon, { bottom: 0 }]}
          onPress={center}
          name="locate"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  callout: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  icon: {
    zIndex: 2,
    position: 'absolute',
    left: 12,
    fontSize: 48,
    bottom: 64,
    color: '#0275d8',
  },
});
