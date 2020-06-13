import styles from './styles';
import React, { Component, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, Picker } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { useRoute } from '@react-navigation/native'

const pickerStyle = {

};
function CreateScreen({ navigation }) {
	const route = useRoute();

	function sendMap( request ){
		console.log(request);
		// Function which sends a post request containing map data, mk

		// generic XHR request
		// body is manually strung together because nothing else worked
		// https://reactnative.dev/docs/network
		// https://stackoverflow.com/a/44044190/13095638
		fetch('https://thenathanists.uogs.co.uk/api.post.php', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/x-www-form-urlencoded'
		  },
		  body: "fn=" + request.fn +
		  		"&mapName=" + request.name +
		  		"&difficulty=" + request.difficulty +
		  		"&description=" + request.description + 
		  		"&lat=" + request.lat +
		  		"&lng=" + request.lng +
		  		"&id=" + global.id +
		  		"&questId=" + route.params.id
		}).then((response) => response.json()).then((responseJson) => alert(responseJson.msg));
	}


	// function to export map creation screen, mk

	// state hook containing map details
	// https://reactjs.org/docs/hooks-intro.html
	// https://stackoverflow.com/a/54150873/13095638
	const [mapDetails, setMapDetails] = useState({
		fn: 'createMap',
		lat: 'None',
		lng: 'None',
		difficulty: '',
		description: '',
		name: ''
	});

	// route used for passing variables between screen navigation

	console.log(route.params);
	console.log(mapDetails);

	// useeffect used done on page loads, allows for updating of variables without infinite loops
	// right now the lat and lon are one selection behind what the user selects, since the values are taken by the page before they are updated
	// I'm not quite sure how to fix it, i tried making it async but no bueno
	// https://github.com/react-navigation/react-navigation/issues/2473#issuecomment-522704708
	// https://www.debuggr.io/react-update-unmounted-component/
	// https://github.com/react-navigation/react-navigation/issues/5996
	useEffect(() => {

		if (route.params.coords) {
			mapDetails['lat'] = route.params.coords.latitude;
			mapDetails['lng'] = route.params.coords.longitude;
		}
	})


	useEffect(() => {
		if (route.params.mode == 'Edit') {
		fetch('https://thenathanists.uogs.co.uk/api.post.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: "fn=getQuestDetails" + 
				'&questId=' + route.params.id
		}).then((response) => response.json()).then(
		(responseJson) => setMapDetails(responseJson.mapDetails)
		)
	}
	},[]);


	return (
		// Page markup
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.formContainer}>


			<Text style={styles.titleText}> Create New Map </Text>

			<Text style={styles.heading}>Map Name:</Text>
			<TextInput style={styles.textInput}
				placeholder='Tap here to enter the quest name'
				value={mapDetails.name}
				onChangeText={val => setMapDetails({...mapDetails, name: val})}
			/>

			<Text style={styles.heading}>Map Description</Text>
			<TextInput style={styles.textInput}
				multiline
				numberOfLines = {4}
				maxLength = {256}
				placeholder='Quest Desc Here'
				value={mapDetails.description}
				onChangeText={val => setMapDetails({...mapDetails, description: val})}
			/>

			<Text style={styles.heading}>Difficulty:</Text>
			<Picker
				selectedValue={mapDetails.difficulty}
				style={styles.picker}
				onValueChange={(itemValue, itemIndex) =>
					setMapDetails({...mapDetails, difficulty: itemValue})
				}>
				<Picker.Item label="Beginner" value="beginner" />
				<Picker.Item label="Intermediate" value="intermediate" />
				<Picker.Item label="Difficult" value="difficult" />
			</Picker>

			<Text style={styles.heading}>Initial Co-ordinates:</Text>
			<Button color='#56B09C' title="Select Co-ordinates" onPress={() => navigation.navigate('Map')} />

		{/* Text is only for testing purposes, you can see the coords are always one behind selection*/}
			<Text style={styles.smallText}>Lat: {mapDetails.lat} Lon: {mapDetails.lng}</Text>
			{ (route.params.mode == 'Edit') ? ( 
			<Button title="Edit Quest" color='#56B09C' onPress={() => sendMap(mapDetails)} />
			) : ( 
			<Button title="Create Quest" color='#56B09C' onPress={() => sendMap(mapDetails)} />
			)}
			</View>
		</ScrollView>
	);
}

export default CreateScreen; // e.g. DetailScreen