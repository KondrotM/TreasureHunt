import React, { Component } from 'react';
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
  },
  mapInfoText: {
    backgroundColor: "rgba(0,0,0,0.4)",
    textShadowColor: "#000",
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 16,
    color: '#fff',
    zIndex: 9999,
    position: "absolute",
    top: 42.5,
    left: 0,
    right: 0,
    padding: 16
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

// With thanks to https://stackoverflow.com/questions/41139643/react-native-how-to-change-text-value-dynamically for teaching me React Native state management
export class MapScreen extends Component {
  constructor() {
    super()
    this.state = {
      mapCoords: {
        latitude: 51.888106,
        longitude: -2.088446,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: 51.888106,
            longitude: -2.088446,
            
            // The deltas are used for the zoom level.
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          style={styles.map}
          onRegionChangeComplete={(newCoords) => this.setState({mapCoords: newCoords})}
        />
        <Text style={styles.mapInfoText}>Coords: {this.state.mapCoords.latitude.toPrecision(16)}, {this.state.mapCoords.longitude.toPrecision(16)}</Text>
      </View>
    )  
  }
}

export class RegisterScreen extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
    }
  }

  render() {
    return (
			<View style={styles.container}>
				<TextInput style={styles.text}
					placeholder='Name here'
				/>
			</View>
	  );
  }
}

function SocialScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Social screen</Text>
    </View>
  );
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      mapCoords: {
        latitude: 51.888106,
        longitude: -2.088446,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    }
  }
  render() {
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
                iconName = focused ? 'home' : 'home';
              } else if (route.name === "Map") {
                iconName = focused ? 'map' : 'map-o';
              } else if (route.name === "Create") {
                iconName = focused ? 'plus-square' : 'plus-square-o';
              } else if (route.name === "Social") {
                iconName = focused ? 'user' : 'user-o';
              } else if (route.name === "Register") {
                iconName = focused ? 'pencil-square' : 'pencil-square-o';
              }

              return <FontAwesome name={iconName} color={color} size={size} />
            }
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Create" component={CreateScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Social" component={SocialScreen} />
				  <Tab.Screen name="Register" component={RegisterScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}