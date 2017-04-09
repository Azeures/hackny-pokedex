import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Navigator,
  Image,
  View
} from 'react-native';

class Landing extends Component {

  render() {
    return (
      <Image style={styles.container} source={require('./assets/landing-page-bg.png')}>
        <View style={{flex: 1, backgroundColor: 'transparent'}}>
        </View>
        <Image source={require('./assets/logo.png')}  style={{flex: 5, backgroundColor: 'transparent'}} />
        <TouchableOpacity style={{flex: 1}} onPress={this.routeCamera.bind(this)}>
          <Image
            source={require('./assets/camera-icon.png')}
            style={{flex: 1, backgroundColor: 'transparent'}}/>
        </TouchableOpacity>
      </Image>
    );
  }
  routeCamera() {
    this.props.navigator.push({
      id: 'ViewFinder'
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  button: {
    // fontFamily: 'Helvetica Neue',
    // textAlign: 'center',
    // fontSize: 24,
    backgroundColor: 'rgba(255, 216, 77, 0.5)',
    overflow: 'hidden',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 5,
    // height: 200,
    // width: 200,
    resizeMode: 'cover',
  }
});

module.exports = Landing;
