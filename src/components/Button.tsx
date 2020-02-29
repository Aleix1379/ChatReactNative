import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

import theme from '../styles/theme.style';

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

const Button: React.FC<Props> = ({title, onPress}) => {
  return (
    <TouchableHighlight style={styles.button} onPress={onPress}>
      <Text style={styles.textButton}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: theme.PRIMARY_COLOR,
    height: 40,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    borderRadius: 3,
  },
  textButton: {
    color: theme.LIGHT_COLOR,
    lineHeight: 40,
    textAlign: 'center',
  },
});

export default Button;
