import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import theme from '../../styles/theme.style';
import styles from './Loading.sass';

interface Props {
  message?: string;
}

const Loading: React.FC<Props> = ({message}) => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={theme.SECONDARY_COLOR} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

export default Loading;
