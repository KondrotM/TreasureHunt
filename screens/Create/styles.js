import { StyleSheet } from 'react-native';

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
  inlineMap: {
    width: '200px',
    height: '200px'
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

export default styles;