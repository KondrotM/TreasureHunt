import * as React from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';

// Import elements
//import { Input } from 'react-native-elements';

// Navbar and headers
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Iconography
import { FontAwesome } from '@expo/vector-icons';

// Map
import MapView from 'react-native-maps';

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
  },
  // Make the map fill the page
  map: {
    width: '100%',
    height: '100%'
  }
});

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Home screen</Text>
      <Button title="Go to Create" onPress={() => navigation.navigate('Create')}></Button>
	  <Button title="Go to Register" onPress={() => navigation.navigate('Register')}></Button>
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

function MapScreen() {
  return (
    <View style={styles.container}>
      
      <MapView
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      />
    </View>
  )
}

function RegisterScreen(){
	return (
			<View style={styles.container}>
					<TextInput style={styles.text}
							placeholder='Name here'
					/>
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

export default function App() {
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
				<Tab.Screen name="Register" component={RegisterScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}