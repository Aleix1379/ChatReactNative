import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import theme from '../styles/theme.style';

const LoadingComponent = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator
        style={styles.indicator}
        size="large"
        color={theme.SECONDARY_COLOR}
      />
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
    zIndex: 1000,
    backgroundColor: 'rgba(66,66,66,0.8)',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default LoadingComponent;
