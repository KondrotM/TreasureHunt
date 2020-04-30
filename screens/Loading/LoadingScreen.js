import styles from './styles';
import React, { Component } from 'react';
import { Text, View } from 'react-native';


function LoadingScreen(){
	return (

		<View style={styles.container}>
			<Text>This is the LoadingScreen.</Text>
		</View>

	);
}


export default LoadingScreen; // e.g. DetailScreen