import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import Button from '../../components/Button/Button';
import styles from './ErrorModal.sass';

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

export default ErrorModal;
