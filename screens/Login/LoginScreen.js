import styles from './styles';
import React, { Component, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
// import { Icon } from 'react-native-elements';

// import Navigator from '../../navigation/Navigator';

function requestLogin( request, navigation ) {
    fetch('https://thenathanists.uogs.co.uk/api.demo.php', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "fn="+request.fn +
            "&username=" + request.username + 
            "&password=" + request.password
        }).then((response) => response.json()).then((responseJson) => handleLogin(responseJson, navigation));
    }

function handleLogin( response, navigation ) {
    console.log(response);
    if (response.msg.login == 'true') {
        navigation.navigate('Explore More', {login: response});
    } else {
        alert('Username or password incorrect');
    }
}

function LoginScreen({ navigation }) {
    const [loginDetails, setLoginDetails] = useState({
        fn: 'login',
        username: '',
        password: '',
    });
	return ( 
      <View style={styles.container}>
      	<View style={styles.formContainer}>
      		<Text style={styles.heading}>Username:</Text>
      		<TextInput style={styles.textInput}
              placeholder='Tap here to enter your Username'
              value={loginDetails.username}
              onChangeText={val => setLoginDetails({...loginDetails, username: val})}
            />
            <Text style={styles.heading}>Password:</Text>
            <TextInput style={styles.textInput}
              placeholder = '********'
              textContentType = 'password'
              secureTextEntry = {true}
              onChangeText={val => setLoginDetails({...loginDetails, password: val})}
            />
	        <Text>This is the LoginScreen.</Text>
    	    <Button title="Login" onPress={() => requestLogin(loginDetails, navigation)}> </Button>
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