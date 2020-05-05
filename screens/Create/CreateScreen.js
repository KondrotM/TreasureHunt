import styles from './styles';
import React, { Component, useState } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, Picker } from 'react-native';
import { StackNavigator } from 'react-navigation';

const pickerStyle = {

};

function CreateScreen({ navigation }) {
	const [fn, setFn] = useState('createMap');
	const [mapX, setMapX] = useState('0.00');
	const [mapY, setSetMapY] = useState('0.00');
	const [difficulty, setDifficulty] = useState('');
	const [description, setDescription] = useState('');
	const [mapName, setMapName] = useState('');

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.formContainer}>


			<Text style={styles.titleText}> Create New Map </Text>

			<Text style={styles.heading}>Map Name:</Text>
			<TextInput style={styles.textInput}
				placeholder='Tap here to enter the map name'
				value={mapName}
				onChangeText={val => setMapName(val)}
			/>

			<Text style={styles.heading}>Map Description</Text>
			<TextInput style={styles.textInput}
				multiline
				numberOfLines = {4}
				maxLength = {256}
				placeholder='Map Desc Here'
				value={description}
				onChangeText={val => setDescription(val)}
			/>

			<Text style={styles.heading}>Difficulty:</Text>
			<Picker
				selectedValue={difficulty}
				style={styles.picker}
				onValueChange={(itemValue, itemIndex) =>
					setDifficulty(itemValue)
				}>
				<Picker.Item label="Beginner" value="beginner" />
				<Picker.Item label="Intermediate" value="intermediate" />
				<Picker.Item label="Difficult" value="difficult" />
			</Picker>

			<Text style={styles.heading}>Initial Co-ordinates:</Text>
			<Button title="Select Co-ordinates" onPress={() => navigation.navigate('Map')} />
			<Text style={styles.smallText}>X {mapX} Y {mapY}</Text>


			<Button title="Create Map" onPress={() => fetch(
					"https://thenathanists.uogs.co.uk/api.php?fn=createMap&mapName=" + mapName + "&description=" + description + "&difficulty=" + difficulty).then((response) => response.json()).then((responseJson) => {alert(responseJson.Msg)})}>
				</Button>

			</View>
		</ScrollView>
	);
}

// 	render() {
// 	const { navigation } = this.props.navigation;
// 	return (
// 		<ScrollView contentContainerStyle={styles.container}>

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