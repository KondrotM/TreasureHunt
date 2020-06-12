import styles from './styles';
import React, { Component, useEffect, useState} from 'react';
import { Text, Button, TouchableHighlight, View, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
// import { useNavigation } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MapScreen } from '../Map';
import { StackNavigator } from 'react-navigation';




function QuestBox({navigation, title, diff, id}) {
	return (
		<TouchableHighlight 
			style={styles.questBox} >

			<View style={{flex:1,flexDirection:'row',alignItems:'center'}}>

				<View style={{flex:1, marginLeft: 15, alignItems:'flex-start'}}>

					<FontAwesomeIcon icon={faMap} size={25} />

					<View style={{ flex:1, marginLeft: -7, flexDirection: 'row'}}>
						<Text>{diff}</Text>
					</View>
				</View>

				<View style={{flex:3}}>
					<Text style={styles.questText}>{title}</Text>
				</View>
			</View>
		</TouchableHighlight>
	);
}

function QuestEditorScreen({ navigation, questsToShow }){


	const [questDetails, setQuestDetails] = useState({
		id: '',
		name: '',
		description: '',
		difficulty: '',
		lat: parseFloat(51.888106),
		lng: parseFloat(-2.088446),
		crumbs: []
	});


	// State hook which holds quest information, mk
	const [questsList, setQuestsList] = useState([
		]);


	// asynchronous function which updates questsList on response, mk
	function getQuestEditorDetails(){
		fetch('https://thenathanists.uogs.co.uk/api.post.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'fn=getQuestEditorDetails'
		}).then(
		(response) => response.json()
		).then(
		(json) => setQuestsList(json.maps)
		);
	};

	// useEffect is called when the screen loads, as it has no triggers, [], it is only called once
	useEffect(() => {
		getQuestEditorDetails();
		console.log(global.id);
	});


	return (
		<View style={styles.container}>
			<View style = {styles.formContainer}>
			<Text style={styles.titleText}> Your Quests </Text>
			<View style={{height: 300, width: 300, marginBottom: 20}}>
			<ScrollView style={styles.scrollView}>
		{/* Embedded react js code essentially acting as a for loop */}
			{questsList.map((questInfo) => {
				return (
					<QuestBox diff={questInfo.diff} title={questInfo.title} id={questInfo.id} key={questInfo.id} navigation = {navigation}/>
				);
			})}
			</ScrollView>
			</View>
			<Button title='Create new Breadcrumb' color='#56B09C' onPress={() => (navigation.navigate('Create Breadcrumb', {quest : questDetails}))} />
			</View>
		</View>
	);
}

export default QuestEditorScreen; // e.g. DetailScreen