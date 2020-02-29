import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import theme from '../styles/theme.style';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import Button from '../components/Button';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const ErrorModal: React.FC<Props> = ({navigation}) => {
  const title = navigation.getParam('title');
  const message = navigation.getParam('message');
  return (
    <SafeAreaView style={styles.saveView}>
      <Text style={styles.message}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.button}>
        <Button title="Close" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saveView: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  message: {
    fontWeight: 'bold',
    fontSize: 22,
    color: theme.SECONDARY_COLOR,
    marginBottom: 8,
  },
  button: {
    marginTop: 'auto',
  },
});

export default ErrorModal;
