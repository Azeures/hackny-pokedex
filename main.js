import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Navigator,
  View
} from 'react-native';

const Landing = require('./landing');
const ViewFinder = require('./viewFinder');
const Profile = require('./profile');

class Main extends Component {

  render() {
    return (
      <Navigator
      initialRoute = {{
        id: 'Landing'
      }}
      renderScene={
        this.navigatorRenderScene
      }
      />
    );
  }
  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'Landing':
        return (<Landing navigator={navigator} title="Landing"/>)
      case 'ViewFinder':
        return(<ViewFinder navigator={navigator} title="ViewFinder"/>)
      case 'Profile':
        return(<Profile navigator={navigator} {...route.props} title="Profile"/>)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
});

export default Main;
