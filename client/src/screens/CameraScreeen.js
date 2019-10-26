'use strict';
import 'react-native-gesture-handler';
import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import PageView from '../components/PageView';
export default class CameraView extends PureComponent {
  state = {
    flash: false,
    front: true,
    zoom: 0,
  };
  render() {
    const flashIcon = this.state.flash ? (
      <TouchableOpacity onPress={this.toggleFlash}>
        <Icon style={styles.icon} name="md-flash" />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={this.toggleFlash}>
        <Icon style={styles.icon} name="md-flash-off" />
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          ref={ref => {
            this.camera = ref;
          }}
          type={
            this.state.front
              ? RNCamera.Constants.Type.front
              : RNCamera.Constants.Type.back
          }
          flashMode={RNCamera.Constants.FlashMode.off}
          zoom={this.state.zoom}
        />

        <View style={styles.cameraOptions}>
          {flashIcon}
          <TouchableOpacity onPress={this.reverseCamera}>
            <Icon style={styles.icon} name="md-reverse-camera" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={this.takePicture.bind(this)}
          style={styles.capture}>
          <Icon style={styles.icon} name="md-camera" />
        </TouchableOpacity>
      </View>
    );
  }
  reverseCamera = () => {
    this.setState({ front: !this.state.front });
  };

  toggleFlash = () => {
    this.setState({ flash: !this.state.flash });
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 1, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 0,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    height: '100%',
    zIndex: 1,
  },
  cameraOverlay: {
    zIndex: 2,
  },
  cameraOptions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginBottom: '5%',
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture: {
    position: 'absolute',
    marginBottom: '5%',
    bottom: 0,
    right: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  icon: {
    fontSize: 32,
    color: 'white',
    margin: 'auto',
  },
});
