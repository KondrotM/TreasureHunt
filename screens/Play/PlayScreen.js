import styles from './styles';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

function PlayScreen(){
	return (
		<View style={styles.container}>
			<Text>This is the PlayScreen.</Text>
		</View>
	);
}

export default PlayScreen; // e.g. DetailScreen