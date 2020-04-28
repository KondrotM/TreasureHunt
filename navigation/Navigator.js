import SocialScreen from '../screens/Social';
import LoginScreen from '../screens/Login';
import CreateScreen from '../screens/Create';
import LoadingScreen from '../screens/Loading';

import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createSwitchNavigator} from 'react-navigation';

const HomeStack = createStackNavigator()

function myStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Social" component={SocialScreen} />
			<Stack.Screen name="Create" component={CreateScreen} />
		</Stack.Navigator>
		);
}


const MainTabs = createBottomTabNavigator();

function myBottomTabs(){
	return (
		<Tab.Navigator>
			<Tab.Screen name="Login" component={LoginScreen} />
			<Tab.Screen name="Social" component={SocialScreen} /> 
		</Tab.Navigator>
	);
}

// const HomeStack = createStackNavigator({SocialScreen, CreateScreen})
// const MainTabs = createBottomTabNavigator({HomeStack, LoginScreen})



// const RootSwitch = createSwitchNavigator({ LoadingScreen, MainTabs});



// export default MainTabs;

export default function BottomTabNagivator ({ navigation, route }) {
	return (
		<MainTabs.Navigator initlaRouteName = {'Login'}>
			<MainTabs.Screen
			name = "Login"
			component={LoginScreen}
			/>

			<MainTabs.Screen
			name="Social"
			component={SocialScreen}
			/>

		</MainTabs.Navigator>
	);
}