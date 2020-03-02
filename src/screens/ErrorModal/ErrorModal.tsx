import React from 'react';
import {SafeAreaView, StyleProp, Text, View, ViewStyle} from 'react-native';
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
    <SafeAreaView style={styles.saveView as StyleProp<ViewStyle>
    }>
      <Text style={styles.message as StyleProp<ViewStyle>}>{title}</Text>
      <Text style={styles.message as StyleProp<ViewStyle>}>{message}</Text>
      <View style={styles.button as StyleProp<ViewStyle>}>
        <Button title="Close" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

export default ErrorModal;
