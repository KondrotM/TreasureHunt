import styles from './styles';
import React, { Component, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';


// function sends login request to the API
function requestLogin( request, navigation ) {
    fetch('https://thenathanists.uogs.co.uk/api.post.php', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "fn="+request.fn +
            "&username=" + request.username + 
            "&password=" + request.password
        }).then((response) => response.json()).then((responseJson) => handleLogin(responseJson, navigation));
    }

// function to handle respose from API
function handleLogin( response, navigation ) {
    console.log(response);
    if (response.msg.login == 'true') {
        navigation.navigate('Explore More', {login: response});
    } else {
        alert('Username or password incorrect');
    }
}


function LoginScreen({ navigation }) {
  // react hook holding login details
    const [loginDetails, setLoginDetails] = useState({
        fn: 'login',
        username: '',
        password: '',
    });

    // page markup
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


export default LoginScreen;