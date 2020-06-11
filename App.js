import React, {useState} from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Navigator from './navigation/Navigator';
import MapScreen from './screens/Map';
import QuestDetailsScreen from './screens/QuestDetails';
import QuestScreen from './screens/Quest';

const Stack = createStackNavigator();

function MyStack() {
  return (
    // There is a BottomTabNavigator within the Stack Navigator
    // The BottomTabNavigator holds references to the play/create/social screens
    // Any other screens can be added to this stack screen and can be navigated to, but they won't be shown on the navigator, mk
    <Stack.Navigator>
      <Stack.Screen 
      name='Explore More' 
      component={Navigator}
      options={{
        headerStyle: {
          backgroundColor: '#caf7e2'
        }
      }}/>
      <Stack.Screen 
      name='Map' 
      component = {MapScreen} 
      options={{
        headerStyle: {
          backgroundColor: '#caf7e2'
        }
      }}
      />
      <Stack.Screen
      name='Quest Details'
      component={QuestDetailsScreen}
      options={{
        headerStyle: {
          backgroundColor: '#caf7e2'
        }
      }}
      />
      <Stack.Screen
      name='Quest'
      component = {QuestScreen}
      options={{
       headerStyle: {
          backgroundColor: '#caf7e2'
        }
      }}
      />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
