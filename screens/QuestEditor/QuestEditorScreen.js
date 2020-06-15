import styles from './styles';
import React, { Component, useEffect, useState} from 'react';
import { Text, Button, TouchableHighlight, View, SafeAreaView, ScrollView, Alert} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { MapScreen } from '../Map';
import { StackNavigator } from 'react-navigation';
import { useRoute } from '@react-navigation/native'



function QuestEditorScreen({ navigation, questsToShow }){


	// Function to return markup of quest box,
	// Quest box is used in this scenario to show breadcrumb overview
	function QuestBox({navigation, title, id}) {
		return (
			<TouchableHighlight 
				style={styles.questBox} >

				<View style={{flex:1,flexDirection:'row',alignItems:'center'}}>


					<View style={{flex:1, marginLeft: 15, alignItems:'flex-start'}}>
						<FontAwesomeIcon icon={faMap} size={25} />
					</View>

					<View style={{flex:3}}>
						<Text style={styles.questText}>{title}</Text>
					</View>
					<FontAwesomeIcon icon={faTrash} style={{color: '#386150'}} size={20} onPress={() => (Alert.alert('Are you sure?','Are you sure you want to delete this breadcrumb?',
						[
						{
							text: 'No',
							style: 'cancel'
						},
						{
							text: 'Yes',
							onPress: () => deleteCrumb(id),
						}
						]))}/>
				</View>
			</TouchableHighlight>
		);
	}

	const route = useRoute();

	// default details used by the quest editor
	const [questDetails, setQuestDetails] = useState({
		id: '',
		name: '',
		description: '',
		difficulty: '',
		lat: parseFloat(51.888106),
		lng: parseFloat(-2.088446),
		crumbs: []
	});


	// State hook which holds quest information
	const [crumbsList, setCrumbsList] = useState([
		]);


	// asynchronous function which updates questsList on response
	function getQuestEditorDetails(){
		fetch('https://thenathanists.uogs.co.uk/api.post.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'fn=getQuestCrumbs' + 
				'&questId=' + route.params.questId
		}).then(
		(response) => response.json()
		).then(
		(json) => setCrumbsList(json.crumbs)
		);
	};

	// function sends delete breadcrumb request to api
	function deleteCrumb(crumbId){
		fetch('https://thenathanists.uogs.co.uk/api.post.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'fn=deleteCrumb' + 
			'&crumbId=' + crumbId + 
			'&questId=' + questDetails.id
		}).then(
		(response) => response.json()
		).then(
		(json) => setCrumbsList(json.crumbs)
		);
	};

	// function sends request to delete the whole quest
	function deleteQuest(questId) {
		fetch('https://thenathanists.uogs.co.uk/api.post.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'fn=deleteQuest' + 
				'&questId' + questId
		}).then(
		(response) => response.json()
		).then(
		(json) => handleDeleteQuest(json.msg)
		);
	};

	// handles quest deletion response
	function handleDeleteQuest(msg) {
		alert(msg);
		navigation.navigate('Create');
	}

	// useEffect is called when the screen loads, as it has no triggers, [], it is only called once
	useEffect(() => {
		getQuestEditorDetails();
		console.log(global.id, route.params.questId);
	},[]);


	return (
		// page markup
		<View style={styles.container}>
			<View style = {styles.formContainer}>
			<Text style={styles.titleText}> Quest Breadcrumbs </Text>
			<View style={{height: 300, width: 300, marginBottom: 20}}>
			<ScrollView style={styles.scrollView}>
		{/* Embedded react js code essentially acting as a for loop */}
			{crumbsList ? (
			<>

			{ crumbsList.map((questInfo) => {
				return (
					<QuestBox title={questInfo.name} id={questInfo.id} key={questInfo.id} navigation = {navigation}/>
				);
			}) }

			</>

			) : (<> 
			<Text style={{alignSelf:'center'}}> No breadcrumbs to show </Text>
			</> ) }
			</ScrollView>
			</View>
			<View style={{marginBottom: 10}}>
			<Button title='Create new Breadcrumb' color='#56B09C' onPress={() => (navigation.navigate('Create Breadcrumb', {quest : questDetails}))} />
			</View>
			<View style={{marginBottom: 10}}>
			<Button title='Edit Quest Details' color='#56B09C' onPress={() => (navigation.navigate('Create Quest', {mode : 'Edit', id: questDetails.id}))} />
			</View>
			<View style={{marginBottom: 10}}>
			<Button title='Delete Quest' color='#386150' onPress={() => (Alert.alert('Are you sure?','Are you sure you want to delete this quest?',
						[
						{
							text: 'No',
							style: 'cancel'
						},
						{
							text: 'Yes',
							onPress: () => deleteQuest(questDetails.id),
						}
						]))}/>
			</View>
			</View>
		</View>
	);
}

export default QuestEditorScreen; // e.g. DetailScreen