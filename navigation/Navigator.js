// Created screens imported
import SocialScreen from '../screens/Social';
import LoginScreen from '../screens/Login';
import CreateScreen from '../screens/Create';
import LoadingScreen from '../screens/Loading';
import RegisterScreen from '../screens/Register';
import PlayScreen from '../screens/Play';
import YourQuestsScreen from '../screens/YourQuests';

import React, {useState, useEffect} from 'react';

// React navigation imports
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createSwitchNavigator} from 'react-navigation';
import { useRoute } from '@react-navigation/native'

// Icons
import { FontAwesome } from '@expo/vector-icons';

const MainTabs = createBottomTabNavigator();

// Global param to handle user Id
global.id = '1';

export default function BottomTabNavigator({ navigation }){
	// isLoggedIn toggles which navigation screen is shown
	// (Logged in / Logged out)
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const route = useRoute();


	useEffect(() => {
		if (route.params){
			// Page is re-navigated to through login button
			// This allows a new value to be passed to the main page
			if (route.params.login.msg.login == 'false') {
				setIsLoggedIn(false);
				global.id = '';
			}
			if (route.params.login.msg.login == 'true') {
				setIsLoggedIn(true);
				global.id = route.params.login.msg.id;
			}
		}
	});

	console.log(route.params);

	if (isLoading) {
		return <LoadingScreen />;
	}

		return (
			// Bottom tab navigator
			<MainTabs.Navigator initlaRouteName = {'Login'}             tabBarOptions={{
                activeTintColor: '#000', 
                inactiveTintColor: '#777', 
                activeBackgroundColor: '#caf7e2', 
                inactiveBackgroundColor: '#caf7e2'
            }}>
			{isLoggedIn ? (
				<>
				<MainTabs.Screen
				name = "Play"
				component={PlayScreen}
				options = {{
					tabBarLabel: 'Play',
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="map" color={color} size={size} />
				),
				}}
				/>

				<MainTabs.Screen
				name = "Create"
				component={YourQuestsScreen}
				options = {{
					tabBarLabel: 'Create',
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="pencil-square" color={color} size={size} />
				),
				}}
				/>

				<MainTabs.Screen
				name="Social"
				component={SocialScreen}
				options = {{
					tabBarLabel: 'Social',
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="user" color={color} size={size} />
				),
				}}
				/>
				</>
				) : (
				<>
				<MainTabs.Screen
				name = "Login"
				component = {LoginScreen}
				/>

				<MainTabs.Screen
				name = "Register"
				component = {RegisterScreen}
				/>
				</>
				)}

			</MainTabs.Navigator>
		);


	}
// export default function BottomTabNagivator () {
// 	const [isLoggedIn, logIn] = loginUser();

// 	function handleLogin() {
// 		setIsLoggedIn(true);
// 	}
// }