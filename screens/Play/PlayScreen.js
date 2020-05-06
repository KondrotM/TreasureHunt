import styles from './styles';
import React, { Component } from 'react';
import { Text, Button, TouchableHighlight, View, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';


// box view sourced from https://link.medium.com/roPmxlS8g6
const BoxSimple = ({ children }) => (
	<View style={styles.box}>
		{children}
	</View>
)

function QuestBox(props) {
	return (
		<TouchableHighlight 
			style={styles.questBox} 
			onPress={() => { console.log('woop')}}>

			<View style={{flex:1,flexDirection:'row',alignItems:'center'}}>

				<View style={{flex:1, marginLeft: 15, alignItems:'flex-start'}}>

					<FontAwesomeIcon icon={faMap} size={25} />

					<View style={{ flex:1, marginLeft: -7, flexDirection: 'row'}}>
						<Text>{props.diff}</Text>
					</View>
				</View>

				<View style={{flex:3}}>
					<Text>{props.title}</Text>
				</View>
			</View>
		</TouchableHighlight>
	);
}

function PlayScreen(){
	return (
		<View style={styles.container}>
			<Text style={styles.titleText}> Quest Selection </Text>
			<Text style={styles.smallText}> Showing Quests in Cheltenham </Text>
			<View style={{height: 265, width: '100%'}}>
			<ScrollView style={styles.scrollView}>

				<QuestBox diff='Easy' title='Getting Around' />
				<QuestBox diff='Medium' title='Chelt Locals Only' />
				<QuestBox diff='Hard' title='Mind Your Business' />
				<QuestBox diff='Hard' title='More Map Icons' />
				<QuestBox diff='Hard' title='To Show Stuff Happening' />
				<QuestBox diff='Hard' title='You Can Scroll Down' />

			</ScrollView>
			</View>
		</View>
	);
}

export default PlayScreen; // e.g. DetailScreen