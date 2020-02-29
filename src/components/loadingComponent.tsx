import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';

import theme from '../styles/theme.style';

interface Props {
  message?: string;
}

const LoadingComponent: React.FC<Props> = ({message}) => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={theme.SECONDARY_COLOR} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100000,
    backgroundColor: 'rgba(66,66,66,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: '#fff',
    marginTop: 32,
    fontSize: 20,
  },
});
export default LoadingComponent;
