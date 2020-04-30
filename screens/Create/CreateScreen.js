import styles from './styles';
import React, { Component, useState } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, Picker } from 'react-native';
import { StackNavigator } from 'react-navigation';

const pickerStyle = {
	picker: {
		color: '#fff',
		borderStyle: 'solid',
		alignSelf: 'flex-start',
		minWidth: '75%',
		maxWidth: '90%'
	}
};

function CreateScreen({ navigation }) {
	const [fn, setFn] = useState('createMap');
	const [mapX, setMapX] = useState('createMap');
	const [mapY, setSetMapY] = useState('createMap');
	const [difficulty, setDifficulty] = useState('createMap');
	const [description, setDescription] = useState('createMap');
	const [mapName, setMapName] = useState('createMap');

	return (
		<View style={styles.container}>
			<Button title="Navigation to Mapation" onPress={() => navigation.navigate('Map',{"valueName":""})} />
			<Button title="Navigate and pass value to map" onPress={() => navigation.navigate('Map',{"valueName":"valueContents"})} />
		</View>
		);
}

// class CreateScreen extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			fn: 'createMap',
// 			userID: 1,
// 			mapX: null,
// 			mapy: null,
// 			mapCoords: null,
// 			locationID: null,
// 			difficulty: 'beginner',
// 			description: '',
// 			mapName: '',
// 			username: 'user',
// 			password: 'pass'
// 		}
// 	}
	
// 	render() {
// 	const { navigation } = this.props.navigation;
// 	return (
// 		<ScrollView contentContainerStyle={styles.container}>
// 			<View style={styles.formContainer}>
// 				<Text style={styles.titleText}>Create New Map</Text>
// 				<Text style={styles.h2Text}>Map Name:</Text>
// 				<TextInput style={styles.textInput}
// 					placeholder='Tap here to enter the map name'
// 					value={this.state.mapName}
// 					onChangeText={mapName => this.setState({mapName})}
// 				/>

// 				<Text style={styles.h2Text}>Map Description:</Text>
// 				<TextInput style={styles.textInput}
// 					placeholder='Tap here to enter description'
// 					value={this.state.description}
// 					onChangeText={description => this.setState({description})}
// 				/>

// 				<Text style={styles.h2Text}>Difficulty:</Text>
// 				<Picker
// 					selectedValue={this.state.difficulty}
// 					style={pickerStyle.picker}
// 					onValueChange={(itemValue, itemIndex) =>
// 						this.setState({difficulty: itemValue})
// 					}>
// 						<Picker.Item label="Beginner" value="beginner" />
// 						<Picker.Item label="Intermediate" value="intermediate" />
// 						<Picker.Item label="Difficult" value="difficult" />
// 					</Picker>

// 				<Text style={styles.h2Text}>Coordinates:</Text>
// 				<TextInput style={styles.textInput}
// 					placeholder='lat, long'
// 					value={this.state.mapCoords}
// 					onChangeText={description => this.setState({mapCoords})}
// 				/>

// 				<Button title='Navigate to Map' onPress={() => navigation.navigate('Map')} />
// 				<Button title='Submit Map' onPress={() => fetch(
// 					"https://thenathanists.uogs.co.uk/api.php?fn=createMap&mapName=" + this.state.mapName + "&description=" + this.state.mapDesc + "&difficulty=" + this.state.difficulty						
// 						).then((response) => response.json()).then((responseJson) => {alert(responseJson.Msg)})}>
// 				</Button>
					
// 				<Button title='Submit via POST' onPress={() => fetch("https://thenathanists.uogs.co.uk/api.php", {
// 							method: 'POST',
// 							headers: {
// 								'Content-Type': 'application/x-www-form-urlencoded'
// 							},
// 							body: 'fn=createMap&body='+JSON.stringify(this.state)
// 						}).then((response) => response.json()).then((responseJson) => {alert(JSON.stringify(responseJson))})}>
// 				</Button>
// 		</View>
// 	</ScrollView>
// 		);
// 	}
// }

export default CreateScreen; // e.g. DetailScreen