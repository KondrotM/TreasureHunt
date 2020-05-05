import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  formContainer: {
    alignSelf: 'center'
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    alignSelf: 'flex-start'
  },
	titleText: {
		fontSize: 24,
		color: '#fff',
		alignSelf: 'center',
		marginBottom: 24
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
  },
  picker: {
    color: '#fff',
    borderStyle: 'solid',
    alignSelf: 'flex-start',
    minWidth: '75%',
    maxWidth: '90%'
  },
  smallText: {
    color: '#fff'
  }
});

export default styles;