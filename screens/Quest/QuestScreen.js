import styles from './styles';
import React, { Component, useState, useEffect } from 'react';
import { Text, TextInput, Button, View, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import DialogInput from 'react-native-dialog-input';

function QuestScreen({navigation}){
	
	const route = useRoute();

	function getCrumbDetails() {
		console.log('what');
		fetch('https://thenathanists.uogs.co.uk/api.post.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: "fn=getCrumbDetails" + 
				"&questId=" + route.params.questId +
				"&userId=" + global.id
			}).then((response) => response.json()).then((json) => setPlayQuest(json.details));
	}

	useEffect(() => {
		getCrumbDetails();
	}, [])

	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);


	useEffect(() => {
	    (async () => {
	      let { status } = await Location.requestPermissionsAsync();
	      if (status !== 'granted') {
	        setErrorMsg('Permission to access location was denied');
	      }

	      let location = await Location.getCurrentPositionAsync({});
	      setLocation(location);
	    })();
	  });

	  let text = 'Waiting..';
	  let lat = 0;
	  let lng = 0;

	  if (errorMsg) {
	    text = errorMsg;
	  } else if (location) {
	    lat = location.coords.latitude;
	    lng = location.coords.longitude;
	}




	const [playQuest, setPlayQuest] = useState({
		questId: '2',
		crumbId: '1',
		questName: '',
		crumbName: '',
		riddle: '',
		answer: '',
		hint: '',
		difficulty: '',
		crumbPos: 0,
		totalCrumbs: 0,
		lat: 0,
		lng: 0
	})

	const [guess, setGuess] = useState('')

	function viewRiddle() {
		var diffLat = lat - playQuest.lat;
		var diffLng = lng - playQuest.lng;

		var dist = Math.pow(diffLat, 2) + Math.pow(diffLng, 2);

		if (dist < 0.001){
			alert(playQuest.riddle);
		} else {
			alert('Get closer to the breadcrumb location!');
		}
	}

	function completeCrumb() {
		fetch('https://thenathanists.uogs.co.uk/api.post.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'fn=completeCrumb' + 
			'&crumbId=' + playQuest.crumbId + 
			'&userId=' + global.id
		}).then(
		(response) => response.json()
		).then(
		(json) => setPlayQuest(json.details)
		);
	}

	function correctAnswer() {
		completeCrumb();
		alert('Correct Answer!');

		if (playQuest.crumbPos > playQuest.totalCrumbs) { 
			alert('Quest completed, congratulations!');
			navigation.navigate('Play');
		}
	}

	function giveUpCrumb() {
		completeCrumb();
		alert('Crumb given up');
	}

	function answerRiddle() {
		if (guess.toLowerCase() == playQuest.answer.toLowerCase()) {
			correctAnswer();
			setGuess('');
		} else {
			alert('Incorrect Guess!');
		}
	}

	function answerRiddle1() {

		Alert.prompt(
			"Answer Riddle",
			"Enter your answer to the riddle",
			[
				{
					text: "Cancel",
					style: "cancel"
				},
				{
					text: "Submit",
					onPress: guess => guessAnswer(guess)
				}
			]
		);

	}

	function getHint() {
		if (playQuest.difficulty.toLowerCase() == 'easy') {
			alert(playQuest.hint);
		} else {
			alert('No hints on ' + playQuest.difficulty + ' mode!');
		}
	}

	function giveUp() {
		if (playQuest.difficulty.toLowerCase != 'hard'){
			Alert.alert('Are you sure?','Are you sure you want to give up?',[
				{
					text: 'No',
					style: 'cancel'
					},
				{
					text: 'Yes',
					onPress: () => giveUpCrumb()
					}
				]);
		} else {
			alert('No giving up on Hard mode!')
		}
	}

	const testLat = 52.95;
	const testLng = -1.2;





    return (
      <ScrollView contentContainerStyle={styles.container}>
      	<Text style={styles.titleText}>{playQuest.questName}</Text>
      	<Text style={styles.heading}>{playQuest.crumbName}, {playQuest.crumbPos}/{playQuest.totalCrumbs}</Text>
      	<View style={styles.mapContainer}>
	      	<MapView
				initialRegion={{
					latitude: route.params.lat,
					longitude: route.params.lng,

					// The deltas are used for the zoom level.
					latitudeDelta: 1,
					longitudeDelta: 1,
				}}
				style={styles.map}
				customMapStyle={customMapStyle}
			>
			<MapView.Marker
            coordinate={{latitude: lat, longitude: lng}} 
            pinColor='tan'
            />
            <MapView.Marker
            coordinate={{latitude: playQuest.lat, longitude: playQuest.lng}} 
            pinColor='tomato'
            />
			</MapView>
		</View>
		<View style={{minWidth: '85%'}}>
		<View style={{marginTop: 10}}>
		<Button title='View Riddle' color='#56B09C' onPress={() => viewRiddle()}/>
		</View>
		<TextInput style={styles.textInput} placeholder='Enter riddle guess here' value={guess} onChangeText={val => setGuess(val)} />
		<View style={{marginTop: 0}}>
		<Button title='Answer Riddle' color='#56B09C' onPress={() => answerRiddle()} />
		</View>
		<View style={{marginTop: 10}}>
		<Button title='Get Hint' color='#56B09C' onPress={() => getHint()}/>
		</View>
		<View style={{marginTop: 10}}>
		<Button title='Give Up' color='#386150' onPress={() => giveUp()}/>
		</View>
		<View style={{marginTop: 10}}>
		</View>
		</View>

	{/*submit riddle
		php functions
		chilliin
	*/}

      </ScrollView>
    );
  }

const customMapStyle = [{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}];


export default QuestScreen; // e.g. DetailScreen
	// https://reactnavigation.org/docs/params/
	// https://blog.mindorks.com/navigate-between-pages-in-a-react-native-app
