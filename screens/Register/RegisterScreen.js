import styles from './styles';
import React, { Component } from 'react';
import { Text, TextInput, View, Button} from 'react-native';

// function RegisterScreen(){
//     return (
//       <View style={styles.container}>
//         <Text>This is the RegisterScreen.</Text>
//       </View>
//     );
//   }

function RegisterScreen(){
	return (
		// <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.heading}>Username:</Text>
            <TextInput style={styles.textInput}
              placeholder='Tap here to enter your Username'
            />

            <Text style={styles.heading}>Email:</Text>
            <TextInput style={styles.textInput}
              placeholder='Tap here to enter your Email'
              textContentType='emailAddress'
            />
            <Text style={styles.heading}>Password:</Text>
            <TextInput style={styles.textInput}
              placeholder = '********'
              textContentType = 'password'
              secureTextEntry = {true}
            />
            <Button title='Register'> </Button>
          </View>
        </View>
      // </ScrollView>
	  );
  }
export default RegisterScreen; // e.g. DetailScreen