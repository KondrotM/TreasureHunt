import styles from './styles';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';

function SocialScreen(){
    return (
      <View style={styles.container}>
        <Text>This is the SocialScreen.</Text>
        <FontAwesomeIcon size = {150} icon={ faMap } />
      </View>
    );
  }

export default SocialScreen;