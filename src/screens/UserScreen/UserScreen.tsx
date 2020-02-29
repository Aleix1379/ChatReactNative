import React from 'react';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {Text} from 'react-native';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const UserScreen: React.FC<Props> = ({navigation}) => {
  return <Text>USer screen...</Text>;
};

export default UserScreen;
