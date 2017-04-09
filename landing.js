import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Navigator,
  View
} from 'react-native';

class Landing extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} />
        <View style={{flex: 2, backgroundColor: 'skyblue'}} />
        <View style={{flex: 3, backgroundColor: 'steelblue', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.button} onPress={this.routeCamera.bind(this)}>Ooh</Text>
        </View>
      </View>
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
    flexDirection: 'column',
  },
  button: {
    fontFamily: 'Helvetica Neue',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    overflow: 'hidden',
    fontSize: 24,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 5,
    height: 50,
    width: 200,
  }
});

module.exports = Landing;
