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
          <Text style={styles.circleButton} onPress={this.routeCamera.bind(this)}>Ooh</Text>
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
  circleButton: {
    borderColor: 'red',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 50,
    width: 50,
  }
});

module.exports = Landing;
