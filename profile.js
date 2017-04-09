const util = require('util')

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Navigator,
  Image,
  View
} from 'react-native';
import extractInfo from './ExtractInformation.js';

class Profile extends Component {

  render() {
    return (
      <View style={styles.container}>
        {this.props.path ? this.renderImage() : this.loading()}
      </View>
    );
  }

  renderImage() {
    extractInfo("https://scontent.xx.fbcdn.net/v/t31.0-8/17545367_10155225197032318_3055188002402293972_o.jpg?oh=2d89029b8928e4bec3d151ac7e99b383&oe=59912318", 
    function(response) {
      this.state = {response};
    });

    contents = this.state.response.map(function(person) {
      return (
        <View>
          <Text>
            person.name
          </Text>
        </View>
      );
    });

    return (
      <View>
        <Image
          source={{ uri: this.props.path }}
          style={styles.preview}
        />
        <Text
          style={styles.cancel}
          onPress={() => this.props.navigator.push({
                  id: 'ViewFinder', })}
        >Cancel
        </Text>
        <View>
          {contents}
        </View>
      </View>
      );
}

loading() {
  return (
    <Text>Loading/././.</Text>
  );
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
},
capture: {
  width: 70,
  height: 70,
  borderRadius: 35,
  borderWidth: 5,
  borderColor: '#FFF',
  marginBottom: 15,
},
cancel: {
  position: 'absolute',
  right: 20,
  top: 20,
  backgroundColor: 'transparent',
  color: '#FFF',
  fontWeight: '600',
  fontSize: 17,
},
});

module.exports = Profile;
