import styles from './styles';
import React, { Component, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, Picker } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { useRoute } from '@react-navigation/native'

const pickerStyle = {

};
function CreateScreen({ navigation }) {
	const route = useRoute();

	function sendQuest( request ){
		console.log(request);
		// Function which sends a post request containing map data

		// generic fetch request
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
		  		"&lat=" + request.latitude +
		  		"&lng=" + request.longitude +
		  		"&userID=" + global.id +
		  		"&questID=" + route.params.id
		}).then(
			(response) => response.json()
		).then(
			(responseJson) => alert(responseJson.msg)
		).catch(
			(error) => {
				console.error('Error:', error);
				alert(error);
			}
		);
	}


	// function to export map creation screen

	// state hook containing map details
	// https://reactjs.org/docs/hooks-intro.html
	// https://stackoverflow.com/a/54150873/13095638
	const [questDetails, setQuestDetails] = useState({
		fn: 'createQuest',
		latitude: 'None',
		longitude: 'None',
		difficulty: '',
		description: '',
		name: '',
		userID: global.id
	});

	// route used for passing variables between screen navigation

	console.log(route.params);
	console.log(questDetails);

	// useeffect used done on page loads, allows for updating of variables without infinite loops
	// right now the lat and lon are one selection behind what the user selects, since the values are taken by the page before they are updated
	// I'm not quite sure how to fix it, i tried making it async but no bueno
	// https://github.com/react-navigation/react-navigation/issues/2473#issuecomment-522704708
	// https://www.debuggr.io/react-update-unmounted-component/
	// https://github.com/react-navigation/react-navigation/issues/5996
	useEffect(() => {

		if (route.params.coords) {
			questDetails['latitude'] = route.params.coords.latitude;
			questDetails['longitude'] = route.params.coords.longitude;
		}
	})


	useEffect(() => {
		// Fetches quest details and sets the fields to their respective values
		// This is done only if the 'edit' parameter is passed upon screen navigation
		if (route.params.mode == 'Edit') {
		fetch('https://thenathanists.uogs.co.uk/api.post.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: "fn=getQuestDetails" + 
				'&questId=' + route.params.id
		}).then((response) => response.json()).then(
		(responseJson) => setQuestDetails(responseJson.questDetails)
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
				value={questDetails.name}
				onChangeText={val => setQuestDetails({...questDetails, name: val})}
			/>

			<Text style={styles.heading}>Map Description</Text>
			<TextInput style={styles.textInput}
				multiline
				numberOfLines = {4}
				maxLength = {256}
				placeholder='Quest Desc Here'
				value={questDetails.description}
				onChangeText={val => setQuestDetails({...questDetails, description: val})}
			/>

			<Text style={styles.heading}>Difficulty:</Text>
			<Picker
				selectedValue={questDetails.difficulty}
				style={styles.picker}
				onValueChange={(itemValue, itemIndex) =>
					setQuestDetails({...questDetails, difficulty: itemValue})
				}>
				<Picker.Item label="Easy" value="easy" />
				<Picker.Item label="Medium" value="medium" />
				<Picker.Item label="Hard" value="hard" />
			</Picker>

			<Text style={styles.heading}>Initial Co-ordinates:</Text>
			<Button color='#56B09C' title="Select Co-ordinates" onPress={() => navigation.navigate('Map')} />

		{/* Text is only for testing purposes, you can see the coords are always one behind selection*/}
			<Text style={styles.smallText}>Lat: {questDetails.latitude} Lon: {questDetails.longitude}</Text>
			{ (route.params.mode == 'Edit') ? ( 
			<Button title="Edit Quest" color='#56B09C' onPress={() => sendQuest(questDetails)} />
			) : ( 
			<Button title="Create Quest" color='#56B09C' onPress={() => sendQuest(questDetails)} />
			)}
			</View>
		</ScrollView>
	);
}

export default CreateScreen; // e.g. DetailScreen