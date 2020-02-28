import React from 'react';
import {Text, View} from 'react-native';

interface Props {}

const HeaderComponent: React.FC<Props> = () => {

  return (
    <View>
      <Text>I am the desktop header</Text>
    </View>
  );
};

export default HeaderComponent;
