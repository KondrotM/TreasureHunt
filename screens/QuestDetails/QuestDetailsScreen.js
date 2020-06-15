import styles from './styles';
import React, { Component, useState, useEffect } from 'react';
import { Text, Button, View, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { StackNavigator } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MapView, { Marker } from 'react-native-maps';

function QuestDetailsScreen( {navigation} ){


	// usestate holding quest details to display, all empty until they are fetched from the API
	const [questDetails, setQuestDetails] = useState({
		name: '',
		id: '',
		description: '',
		difficulty: '',
		lat: 0,
		lng: 0,
		totalCrumbs: '',
		completedCrumbs: ''
	})

	// initiates quest if it is not already completed
	function playQuest() {
		if (questDetails.completedCrumbs >= questDetails.totalCrumbs) { 
			console.log('Quest already completed!');
		} else {
			navigation.navigate('Quest',{questId: route.params.id, lat: questDetails.lat, lng: questDetails.lng});
		}
	}


	const route = useRoute();

	// fetches the quest completion state based on user id
	useEffect(() => {
		fetch('https://thenathanists.uogs.co.uk/api.post.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'fn=getQuestOverview' + 
				'&questId=' + route.params.questId + 
				'&userId=' + global.id
	}).then((response) => 
	response.json()).then((
	responseJson) => setQuestDetails(responseJson.questDetails)
	)},[]);

    return (
    	// page markup
      <ScrollView contentContainerStyle={styles.container}>
		<Text style={styles.titleText}> {questDetails.name}</Text>
		<Text style={styles.subText}> {questDetails.difficulty} Quest</Text>
		<Text style={styles.heading}>Quest Description</Text>
		<Text style={styles.subText}> {questDetails.description}</Text>
		<Text style={styles.heading}>Quest Start Location </Text>
		<View style={styles.mapContainer}>
			<MapView
			region={{
				latitude: questDetails.lat,
				longitude: questDetails.lng,

				// The deltas are used for the zoom level.
				latitudeDelta: 0.05,
				longitudeDelta: 0.05,
			}}
			style={styles.map}
			customMapStyle={customMapStyle}>
			<MapView.Marker
				coordinate={{
					latitude: questDetails.lat, 
					longitude: questDetails.lng}} 
				pinColor='tan'
			/>

			</MapView>
		</View>
		<Text style={styles.heading}>Quest Completion</Text>
		<Text style={styles.subText}>Breadcrumbs Completed: {questDetails.completedCrumbs}/{questDetails.totalCrumbs} </Text>


        {/*<FontAwesomeIcon size = {150} icon={ faMap } />*/}
        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20}}>
        <Button title='Play Quest' onPress={() => playQuest()} />
        </View>
      </ScrollView>
    );
  }

  const customMapStyle = [{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}];

export default QuestDetailsScreen; // e.g. DetailScreen
	// https://reactnavigation.org/docs/params/
	// https://blog.mindorks.com/navigate-between-pages-in-a-react-native-app
