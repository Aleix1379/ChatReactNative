import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Feed = (props: any) => {
  return (
    <View style={styles.container}>
      <Text>This is the feed screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => props.navigation.navigate('Profile')}
      />
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

export default Feed;
