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
        return(<Profile navigator={navigator} title="Profile"/>)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
});

export default Main;
