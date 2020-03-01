import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import theme from '../../styles/theme.style';
import styles from './Loading.sass';
import {WindowUtils} from '../../utils/WindowUtils';

interface Props {
  message?: string;
}

const Loading: React.FC<Props> = ({message}) => {
  return (
    <View style={reactStyle.loading}>
      <ActivityIndicator size="large" color={theme.SECONDARY_COLOR} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const reactStyle = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: WindowUtils.getWindowHeight(),
    zIndex: 99999999,
    backgroundColor: 'rgba(66,66,66,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
});

export default Loading;
