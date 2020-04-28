import SocialScreen from '../screens/Social';
import LoginScreen from '../screens/Login';
import CreateScreen from '../screens/Create';
import LoadingScreen from '../screens/Loading';
import RegisterScreen from '../screens/Register';
import PlayScreen from '../screens/Play';

import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createSwitchNavigator} from 'react-navigation';

// const HomeStack = createStackNavigator()

// function myStack() {
// 	return (
// 		<Stack.Navigator>
// 			<Stack.Screen name="Social" component={SocialScreen} />
// 			<Stack.Screen name="Create" component={CreateScreen} />
// 		</Stack.Navigator>
// 		);
// }



// function myBottomTabs(){
// 	return (
// 		<Tab.Navigator>
// 			<Tab.Screen name="Login" component={LoginScreen} />
// 			<Tab.Screen name="Register" component={RegisterScreen} /> 
// 		</Tab.Navigator>
// 	);
// }

// const HomeStack = createStackNavigator({SocialScreen, CreateScreen})
// const MainTabs = createBottomTabNavigator({HomeStack, LoginScreen})



// const RootSwitch = createSwitchNavigator({ LoadingScreen, MainTabs});


// function loginUser(){
// 	const [isLoggedIn, setIsLoggedIn] = useState(false)

// 	function logIn(){
// 		setIsLoggedIn(true)
// 	}

// 	return [isLoggedIn, logIn]
// }

// export default MainTabs;
const MainTabs = createBottomTabNavigator();

export default class BottomTabNagivator extends React.Component {
	constructor(){
		super()
		this.state = {
			isLoggedIn : true
		}
	}
	render(){

	if (this.state.isLoading) {
		return <LoadingScreen />;
	}

		return (
			<MainTabs.Navigator initlaRouteName = {'Login'}>
			{this.state.isLoggedIn ? (
				<>
				<MainTabs.Screen
				name = "Play"
				component={PlayScreen}
				/>

				<MainTabs.Screen
				name = "Create"
				component={CreateScreen}
				/>

				<MainTabs.Screen
				name="Social"
				component={SocialScreen}
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
}
// export default function BottomTabNagivator () {
// 	const [isLoggedIn, logIn] = loginUser();

// 	function handleLogin() {
// 		setIsLoggedIn(true);
// 	}
// }