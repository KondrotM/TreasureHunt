import styles from './styles';
import React, { Component, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
// import { Icon } from 'react-native-elements';

// import Navigator from '../../navigation/Navigator';

function LoginScreen({ navigation }) {
	return ( 
      <View style={styles.container}>
      	<View style={styles.formContainer}>
      		<Text style={styles.heading}>Username:</Text>
      		<TextInput style={styles.textInput}
              placeholder='Tap here to enter your Username'
            />
            <Text style={styles.heading}>Password:</Text>
            <TextInput style={styles.textInput}
              placeholder = '********'
              textContentType = 'password'
              secureTextEntry = {true}
            />
	        <Text>This is the LoginScreen.</Text>
    	    <Button title="Login" onPress={() => navigation.navigate('LoggedIn')}> </Button>
	      </View>
      </View>
      );
}




// class LoginScreen extends Component {
// 	static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
// 		headerTitle: "Home",
// 		headerLeft: <Button name='md-menu' onPress={() => navigation.toggleDrawer()}
// 		/>
// 	});
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>This is the LoginScreen.</Text>
//         <Button title="Login" onPress={() => navigation.navigate('Social')}> </Button>
//       </View>
//     );
//   }
// }

export default LoginScreen; // e.g. DetailScreen