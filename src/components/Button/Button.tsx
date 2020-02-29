import React from 'react';
import {GestureResponderEvent, Text, TouchableHighlight,} from 'react-native';
import styles from './Button.sass';

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

export default Button;
