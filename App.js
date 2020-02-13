import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

// Navbar and headers
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Iconography
import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  }
});

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Home screen</Text>
      <Button title="Go to Create" onPress={() => navigation.navigate('Create')}></Button>
    </View>
  );
}

function CreateScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Create screen</Text>
    </View>
  );
}

function SocialScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Social screen</Text>
    </View>
  );
}

export default function BottomTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      // Colours
        tabBarOptions={{
            activeTintColor: '#000', inactiveTintColor: '#777', activeBackgroundColor: '#caf7e2', inactiveBackgroundColor: '#caf7e2'
        }}

      // Icons
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? 'map' : 'map-o';
            } else if (route.name === "Create") {
              iconName = focused ? 'plus-square' : 'plus-square-o';
            } else if (route.name === "Social") {
              iconName = focused ? 'user' : 'user-o';
            }

            return <FontAwesome name={iconName} color={color} size={size} />
          }
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Create" component={CreateScreen} />
        <Tab.Screen name="Social" component={SocialScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options=
          {{
            headerStyle: {backgroundColor: '#3d3522'},
            headerTintColor: '#fff',
          }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}