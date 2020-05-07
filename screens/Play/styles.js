import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: '#000'
    // alignSelf: "center",
  },
  formContainer:{
  	alignSelf: 'center'
  },
  heading: {
    fontSize: 24,
    color: '#56B09C',
    alignSelf: 'flex-start'
  },
	titleText: {
		fontSize: 24,
		color: '#CAF7E2',
		alignSelf: 'center',
		marginTop: 24,
		marginBottom: 24
	},
  scrollView: {
    backgroundColor: '#CAF7E2',
    marginHorizontal: 20
  },
  questText: {
  	color: '#CAF7E2',
  	fontSize: 20,
  	marginLeft: -15,
  },
  textInput: {
    color: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#56B09C',
    padding: 8,
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
    minWidth: '75%',
    maxWidth: '90%'
  },
  smallText: {
  	alignSelf: 'flex-start',
    color: '#fff'
  },
  image: {
    marginRight: 0,
    marginLeft: 15
  },
  questBox: {
    alignItems: "center",
    backgroundColor: "#58B09C",
    borderColor: '#CAF7E2',
    borderWidth: 0.5,
    borderRadius: 4,
    padding: 10
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    margin: 20,
  }

});

export default styles;