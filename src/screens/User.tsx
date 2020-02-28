import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationState,} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const User: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>This is the user profile screen</Text>
      <Button title="Go to Feed" onPress={() => navigation.navigate('Feed')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default User;
