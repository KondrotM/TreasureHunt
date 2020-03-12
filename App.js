import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, Picker } from 'react-native';

// Support for notches and display cutouts
// https://reactnavigation.org/docs/en/handling-safe-area.html
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Navbar and headers
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Iconography
import { FontAwesome } from '@expo/vector-icons';

// Map
import MapView from 'react-native-maps';

// Improve performance and reduce memory usage by enabling native screen optimisations
// https://reactnavigation.org/docs/en/react-native-screens.html
import { enableScreens } from 'react-native-screens';
enableScreens();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    alignSelf: 'center'
  },
  h1Text: {
    fontSize: 24,
    color: '#fff',
    alignSelf: 'flex-start',
  },
	h2Text: {
		fontSize: 18,
		color: '#fff',
		alignSelf: 'flex-start',
	},
	titleText: {
		fontSize: 24,
		color: '#fff',
		alignSelf: 'center',
		marginBottom: 24
	},
  text: {
    color: '#fff'
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
  },
  textInput: {
    color: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#fff',
    padding: 8,
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
    minWidth: '75%',
    maxWidth: '90%'
  }
});

const pickerStyle = {
	picker: {
		color: '#fff',
		borderStyle: 'solid',
		alignSelf: 'flex-start',
		minWidth: '75%',
		maxWidth: '90%'
	}
};

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>This is the Home screen</Text>
      <Button title="Go to Create" onPress={() => navigation.navigate('Create')}></Button>
	    <Button title="Go to Register" onPress={() => navigation.navigate('Register')}></Button>
      <Button title="Run fetch test" onPress={() => fetch("https://thenathanists.uogs.co.uk/api.php?fn=username").then((response) => response.json()).then((responseJson) => {alert(responseJson)})}></Button>
      <Button title="Run fetch test 2" onPress={() => fetch("https://thenathanists.uogs.co.uk/api.php?fn=InvalidFunctionName-jioewtjiogdsoifdsijofdsioj").then((response) => response.json()).then((responseJson) => {alert(responseJson)})}></Button>
      <Button title="Run fetch test 3" onPress={() => fetch("https://thenathanists.uogs.co.uk/api.php").then((response) => response.json()).then((responseJson) => {alert(responseJson)})}></Button>
    </SafeAreaView>
  );
}

//function CreateScreen({ navigation }) {
//  return (
//    <SafeAreaView style={styles.container}>
//      <Text style={styles.text}>This is the Create screen</Text>
//			<Button title="Create Map" onPress={() => navigation.navigate('Create')}></Button>
//			
//
//    </SafeAreaView>
//  );
//}

export class CreateScreen extends Component {
	constructor() {
		super()
		this.state = {
			userID: 1,
			locationID: null,
			difficulty: 'beginner',
			description: '',
			mapName: ''
		}
	}
	
	render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
					<Text style={styles.titleText}>Create New Map</Text>
          <Text style={styles.h2Text}>Map Name:</Text>
          <TextInput style={styles.textInput}
            placeholder='Tap here to enter the map name'
						value={this.state.mapName}
						onChangeText={mapName => this.setState({mapName})}
          />

          <Text style={styles.h2Text}>Map Description:</Text>
          <TextInput style={styles.textInput}
            placeholder='Tap here to enter description'
						// might need this for referencing the description later
//						ref = {(el) => { this.description = el; }}
						value={this.state.description}
						onChangeText={description => this.setState({description})}
          />
					
					<Text style={styles.h2Text}>Difficulty:</Text>
					<Picker
						selectedValue={this.state.difficulty}
						style={pickerStyle.picker}
						onValueChange={(itemValue, itemIndex) =>
							this.setState({difficulty: itemValue})
						}>
						<Picker.Item label="Beginner" value="beginner" />
						<Picker.Item label="Intermediate" value="intermediate" />
						<Picker.Item label="Difficult" value="difficult" />
					</Picker>
					
					<Button title='Submit Map' onPress={() => fetch(
							"https://thenathanists.uogs.co.uk/api.php?fn=createMap&mapName=" + this.state.mapName + "&description=" + this.state.mapDesc + "&difficulty=" + this.state.difficulty						
						).then((response) => response.json()).then((responseJson) => {alert(responseJson.Msg)})}></Button>
        </View>
      </ScrollView>
	  );
  }
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

  // The mapStyle JSON is first made here: https://mapstyle.withgoogle.com/ then minified before being pasted into the code here
  customMapStyle = [{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}];

  render() {
    return (
      <SafeAreaView style={styles.container}>
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
          customMapStyle={this.customMapStyle}
        />
        <Text style={styles.mapInfoText}>Coords: {this.state.mapCoords.latitude.toPrecision(16)}, {this.state.mapCoords.longitude.toPrecision(16)}</Text>
      </SafeAreaView>
    )  
  }
}

export class RegisterScreen extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      email: "",
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.h1Text}>Username:</Text>
          <TextInput style={styles.textInput}
            placeholder='Tap here to enter your Username'
          />

          <Text style={styles.h1Text}>{"\n"}Email:</Text>
          <TextInput style={styles.textInput}
            placeholder='Tap here to enter your Email'
            textContentType='emailAddress'
          />
        </View>
      </ScrollView>
	  );
  }
}

function SocialScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>This is the Social screen</Text>
    </SafeAreaView>
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
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    );
  }
}