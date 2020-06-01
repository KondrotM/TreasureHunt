import styles from './styles';
import React, { Component } from 'react';
import { Text, Button, TouchableHighlight, View, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
// import { useNavigation } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MapScreen } from '../Map';
import { StackNavigator } from 'react-navigation';

// box view sourced from https://link.medium.com/roPmxlS8g6
const BoxSimple = ({ children }) => (
	<View style={styles.box}>
		{children}
	</View>
)




function QuestBox({navigation, title, diff, id}) {
	return (
		<TouchableHighlight 
			style={styles.questBox} 
			onPress={() => {navigation.navigate('Quest Details',{questId: id})}}>

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

function PlayScreen({ navigation }){
	return (
		<View style={styles.container}>
			<View style = {styles.formContainer}>
			<Text style={styles.titleText}> Quest Selection </Text>
			<Text style={styles.smallText}> Showing Quests in Cheltenham </Text>
			<View style={{height: 300, width: 300, marginBottom: 20}}>
			<ScrollView style={styles.scrollView}>
				<QuestBox diff='Easy' title='Getting Around' id='0' navigation = {navigation} />
				<QuestBox diff='Medium' title='Chelt Locals Only' id='1' navigation = {navigation}/>
				<QuestBox diff='Hard' title='Mind Your Business' id='2' navigation = {navigation}/>
				<QuestBox diff='Hard' title='More Map Icons' id='3' navigation = {navigation}/>
				<QuestBox diff='Hard' title='To Show Stuff Happening' id='4' navigation = {navigation}/>
				<QuestBox diff='Hard' title='You Can Scroll Down' id='5' navigation = {navigation}/>
				<QuestBox diff='Medium' title='Load These Dynamically' id='6' navigation = {navigation}/>
				<QuestBox diff='Easy' title='From the API' id='7' navigation = {navigation}/>
			</ScrollView>
			</View>
			<Button title='History' color='#56B09C' onPress={() => alert('Not Yet Implemented')} />
			</View>
		</View>
	);
}

export default PlayScreen; // e.g. DetailScreen