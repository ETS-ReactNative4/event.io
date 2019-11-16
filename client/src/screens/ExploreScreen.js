import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { PostContext } from '../context/PostContext'
import MapView, { Marker, Callout, Circle } from 'react-native-maps'
import Icon from '../components/Icon'
import Geolocation from '@react-native-community/geolocation'
import _ from 'lodash'

ExploreScreen.navigationOptions = {
  title: 'Explore'
}
export default function ExploreScreen({ navigation }) {
  const { feeds } = useContext(PostContext)
  const [position, setPosition] = useState({
    longitude: -43.666667,
    latitude: 32
  })

  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        })
      },
      err => console.error(err),
      {
        enableHighAccuracy: true
      }
    )
    return () => {}
  }, [])

  function center() {
    map.animateToRegion(position, 500)
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={map => (this.map = map)}
        style={{ height: '100%', width: '100%', flex: 1 }}
        region={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03
        }}
        showsBuildings={false}
        pitchEnabled={false}
      >
        <Circle
          radius={1000}
          center={position}
          strokeColor={'white'}
          fillColor={'rgba(200,200,248,0.5)'}
        />
        {feeds &&
          _.toArray(feeds).map(feed => {
            return (
              <Marker
                key={feed._id}
                coordinate={feed.location}
                pinColor='darkseagreen'
              >
                <Callout
                  tooltip={true}
                  onPress={() =>
                    navigation.push('FeedDetails', {
                      feed
                    })
                  }
                >
                  <Text style={styles.callout}>{feed.title}</Text>
                </Callout>
              </Marker>
            )
          })}
        <Icon style={styles.icon} onPress={center} name='locate' />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  callout: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  icon: {
    zIndex: 2,
    position: 'absolute',
    left: 24,
    bottom: 24,
    fontSize: 48,
    color: '#0275d8'
  }
})
