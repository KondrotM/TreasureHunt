import styles from './styles';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class CreateScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the CreateScreen.</Text>
      </View>
    );
  }
}

export default CreateScreen; // e.g. DetailScreen