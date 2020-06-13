import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  button: {
    color: '#56B09C'
  },
  formContainer: {
    alignSelf: 'center'
  },
  heading: {
    fontSize: 24,
    color: '#56B09C',
    alignSelf: 'flex-start',
    marginLeft: '10%'
  },
  mapContainer:{
    height: 300,
    minWidth: '85%',
    maxWidth: '85%',
  },
  map: {
    width: '100%',
    height: '100%'
  },
  titleText: {
    fontSize: 24,
    color: '#CAF7E2',
    alignSelf: 'center',
    marginBottom: 12,
  },
  subText: {
  color: 'white', alignSelf:'flex-start', marginLeft: '10%', marginRight: '10%'
  },
  textInput: {
    color: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#56B09C',
    padding: 8,
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center',
    minWidth: '85%',
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