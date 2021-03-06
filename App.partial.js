import * as React from 'react';
// import React, { Component } from "react";
import { StyleSheet, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Orientation, { orientation } from "react-native-orientation";
import {NavigationContainer} from '@react-navigation/native';


import CreateScreen from "./screens/Create"
import Navigator from "./navigation/Navigator";


const Stack = createStackNavigator()

function MyStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Create" component={CreateScreen} />
		</Stack.Navigator>
		);
}

export default function App(props) {
	const containerRef = React.useRef();
	return (
	<View style = {styles.container}>
		<NavigationContainer ref={containerRef}>
			<Stack.Navigator>
				<Stack.Screen name='Root' component={Navigator} />
			</Stack.Navigator>
		</NavigationContainer>
	</View>
	);
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});