import styles from './styles';
import React, { Component } from 'react';
import { Text, Button, View } from 'react-native';
import { useRoute } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { StackNavigator } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function QuestDetailsScreen( {navigation} ){
	const route = useRoute();
	console.log(route);
    return (
      <View style={styles.container}>
        <Text>This is the Quest Details Screen.</Text>
		{(() => {
			// http://10minbasics.com/react-native-jsx-if-statement/
			if (route.params.id !== "") {
				return <Text>Fetch me details for quest ID {route.params.questId}</Text>
			}
		})()}
        <FontAwesomeIcon size = {150} icon={ faMap } />
        <Button title='Play Quest' onPress={() => {navigation.navigate('Quest',{questId: route.params.id})}} />
      </View>
    );
  }

export default QuestDetailsScreen; // e.g. DetailScreen
	// https://reactnavigation.org/docs/params/
	// https://blog.mindorks.com/navigate-between-pages-in-a-react-native-app
