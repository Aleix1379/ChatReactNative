import React from 'react';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {View} from 'react-native';
import MapView from 'react-native-maps';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const MapScreen: React.FC<Props> = ({navigation}) => {
  const coordinates = navigation.getParam('coords');

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
