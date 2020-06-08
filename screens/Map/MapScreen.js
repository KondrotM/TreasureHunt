import styles from './styles';
import React, { Component, useState, useEffect } from 'react';
import { Text, View, Button, SafeAreaView} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { StackNavigator } from 'react-navigation';




function MapScreen( { navigation }){
	const customMapStyle = [{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}];
	
	const [mapCoords, setMapCoords] = useState({
        latitude: 51.888106,
        longitude: -2.088446,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
	const [markers, setMarkers] = useState([
        { coordinate: {latitude: 51.888106, longitude: -2.088446}, key: 0}
      ]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [markerCoords, setMarkerCoords] = useState({
      latitude: 51.888106,
      longitude: -2.088446
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });

  let text = 'Waiting..';
  let lat = 0;
  let lng = 0;

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    lat = location.coords.latitude;
    lng = location.coords.longitude;
  }


	return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: 51.888106,
            longitude: -2.088446,
            
            // The deltas are used for the zoom level.
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          style={styles.map}
          onRegionChangeComplete={(newCoords) => setMapCoords(newCoords)}
          customMapStyle={customMapStyle}>
            {/*{markers.map(marker => (
              <MapView.Marker
                key={marker.key}
                coordinate={marker.coordinate}
              />
            ))}*/}
          <MapView.Marker
            coordinate={{latitude: lat, longitude: lng}} 
            pinColor='tan'
            />
          <MapView.Marker
            coordinate={{latitude: markerCoords.latitude, longitude: markerCoords.longitude}}
            pinColor='tomato'
            draggable
            onDragEnd={(e) => setMarkerCoords(e.nativeEvent.coordinate)}
            />
        </MapView>
        <Text style={styles.mapInfoText}>Coords: {mapCoords.latitude.toPrecision(16)}, {mapCoords.longitude.toPrecision(16)}, Location: {lat}, {lng}, Marker Location: {markerCoords.latitude}, {markerCoords.longitude}</Text>
        <View style={styles.mapButton}>
            <Button color='#56B09C' title='Select' onPress={() => {navigation.navigate('Create',{coords: markerCoords})}}/>
        </View>
      </View>


	);
}

export default MapScreen; // e.g. DetailScreen