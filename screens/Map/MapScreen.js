import styles from './styles';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native'

function MapScreen(){
	// https://reactnavigation.org/docs/params/
	// https://blog.mindorks.com/navigate-between-pages-in-a-react-native-app
	const route = useRoute();
	console.log(route);
	return (

		<View style={styles.container}>
			<Text>This is the Map Screen.</Text>
			{(() => {
				// http://10minbasics.com/react-native-jsx-if-statement/
				if (route.params.valueName !== "") {
					return <Text>Passed value: {route.params.valueName}</Text>
				}
			})()}
		</View>


	);
}

export default MapScreen; // e.g. DetailScreen