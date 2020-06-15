import styles from './styles';
import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button} from 'react-native';


// sends registration request and alerts response message
function requestRegister( request ) {
    fetch('https://thenathanists.uogs.co.uk/api.post.php', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "fn="+request.fn +
            "&username=" + request.username + 
            "&password=" + request.password + 
            "&email=" + request.email
        }).then((response) => response.json()).then((responseJson) => alert(responseJson.msg));
    }

function RegisterScreen(){

    // usestate which holds registration details
    const [registerDetails, setRegisterDetails] = useState({
        fn: 'register',
        username: '',
        password: '',
        email: '',
    });


	return (
      // page markup
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.heading}>Username:</Text>
            <TextInput style={styles.textInput}
              placeholder='Tap here to enter your Username'
              value={registerDetails.username}
              onChangeText={val => setRegisterDetails({...registerDetails, username: val})}
            />

            <Text style={styles.heading}>Email:</Text>
            <TextInput style={styles.textInput}
              placeholder='Tap here to enter your Email'
              textContentType='emailAddress'
              value={registerDetails.email}
              onChangeText={val => setRegisterDetails({...registerDetails, email: val})}
            />
            <Text style={styles.heading}>Password:</Text>
            <TextInput style={styles.textInput}
              placeholder = '********'
              textContentType = 'password'
              secureTextEntry = {true}
              value={registerDetails.password}
              onChangeText={val => setRegisterDetails({...registerDetails, password: val})}
            />
            <Button title='Register' onPress = {() => requestRegister(registerDetails)}> </Button>
          </View>
         </View>
      // </ScrollView>
	  );
  }
export default RegisterScreen; 