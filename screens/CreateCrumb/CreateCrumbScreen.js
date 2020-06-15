import styles from './styles';
import React, { Component, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, Picker } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { useRoute } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps';



function sendBreadcrumb( request ){
	// function to send breadcrumb to API, it will record it in the database
	fetch('https://thenathanists.uogs.co.uk/api.post.php', {
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  body: "fn=" + request.fn +
	  		"&name=" + request.name +
	  		"&riddle=" + request.difficulty +
	  		"&answer=" + request.description + 
	  		"&hint=" + request.hint +
	  		"&lat=" + request.lat +
	  		"&lng=" + request.lng +
	  		"&userID=" + global.id
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


function CreateCrumbScreen({ navigation }) {
	// function to export map creation screen, mk

	// state hook containing map details
	// https://reactjs.org/docs/hooks-intro.html
	// https://stackoverflow.com/a/54150873/13095638
	const [crumbDetails, setCrumbDetails] = useState({
		fn: 'createCrumb',
		lat: 'None',
		lng: 'None',
		riddle: '',
		answer: '',
		hint: '',
		name: ''
	});

	function setCoordinates(coords) {

	}

	// route used for passing variables between screen navigation
	const route = useRoute();


	// useeffect used done on page loads, allows for updating of variables without infinite loops
	// right now the lat and lon are one selection behind what the user selects, since the values are taken by the page before they are updated
	// I'm not quite sure how to fix it, i tried making it async but no bueno
	// https://github.com/react-navigation/react-navigation/issues/2473#issuecomment-522704708
	// https://www.debuggr.io/react-update-unmounted-component/
	// https://github.com/react-navigation/react-navigation/issues/5996
	useEffect(() => {
		crumbDetails['lat'] = route.params.quest.lat - 0.01;
		crumbDetails['lng'] = route.params.quest.lng;
	});

	return (
		// Page markup
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.formContainer}>


			<Text style={styles.titleText}> Create New Breadcrumb </Text>

			<TextInput style={styles.textInput}
				placeholder='Breadcrumb Name'
				value={crumbDetails.name}
				onChangeText={val => setCrumbDetails({...crumbDetails, name: val})}
			/>

			<Text style={styles.heading}>Breadcrumb Position:</Text>
			<View style={styles.mapContainer}>
			<MapView
			initialRegion={{
				latitude: route.params.quest.lat,
				longitude: route.params.quest.lng,

				// The deltas are used for the zoom level.
				latitudeDelta: 0.05,
				longitudeDelta: 0.05,
			}}
			style={styles.map}
			customMapStyle={customMapStyle}>
			<MapView.Marker
				coordinate={{latitude: route.params.quest.lat, longitude: route.params.quest.lng}} 
				pinColor='tan'
			/>
			<MapView.Marker
				coordinate={{latitude: route.params.quest.lat - 0.01, longitude: route.params.quest.lng}}
				pinColor='tomato'
				draggable
				onDragEnd={(e) => setCrumbDetails({...crumbDetails, lat : e.nativeEvent.coordinate.latitude, lng : e.nativeEvent.coordinate.longitude})}
			/>

			</MapView>
			</View>

			<TextInput style={styles.textInput}
				placeholder='Breadcrumb Riddle'
				value={crumbDetails.riddle}
				onChangeText={val => setCrumbDetails({...crumbDetails, riddle: val})}
			/>
			<TextInput style={styles.textInput}
				placeholder='Riddle Answer'
				value={crumbDetails.answer}
				onChangeText={val => setCrumbDetails({...crumbDetails, answer: val})}
			/>
			<TextInput style={styles.textInput}
				placeholder='Riddle Hint (optional)'
				value={crumbDetails.hint}
				onChangeText={val => setCrumbDetails({...crumbDetails, hint: val})}
			/>
			<View style={[{minWidth:"85%", maxWidth:"85%", alignSelf: "center"}]}>
			<Button title="Create Breadcrumb" color='#56B09C' onPress={() => sendBreadcrumb(crumbDetails)}>
			</Button>
			</View>
			</View>
		</ScrollView>
	);
}

const customMapStyle = [{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}];

export default CreateCrumbScreen; // e.g. DetailScreen