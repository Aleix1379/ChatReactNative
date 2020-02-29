import React, {useEffect, useState} from 'react';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {Text, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const MapScreen: React.FC<Props> = ({navigation}) => {
  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      console.log('Latitude' + info.coords.latitude);
      console.log('Longitude' + info.coords.longitude);
      console.log('Longitude' + info.coords.longitude);
      setCoordinates(info.coords);
    });
  }, []);

  return (
    <View>
      <MapView
        style={{
          height: '100%',
          width: '100%',
        }}
        region={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      />
    </View>
  );
};

export default MapScreen;
