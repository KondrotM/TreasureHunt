import styles from './styles';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class MapScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the MapScreen.</Text>
      </View>
    );
  }
}

export default MapScreen; // e.g. DetailScreen