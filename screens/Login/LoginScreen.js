import styles from './styles';
import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
// import { Icon } from 'react-native-elements';

// import Navigator from '../../navigation/Navigator';

function LoginScreen({ navigation }) {
	return ( 
      <View style={styles.container}>
        <Text>This is the LoginScreen.</Text>
        <Button title="Login" onPress={() => navigation.navigate('Profile')}> </Button>
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