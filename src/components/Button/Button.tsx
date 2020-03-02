import React from 'react';
import {GestureResponderEvent, StyleProp, Text, TouchableHighlight, ViewStyle,} from 'react-native';
import styles from './Button.sass';

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

const Button: React.FC<Props> = ({title, onPress}) => {
  return (
    <TouchableHighlight style={styles.button as StyleProp<ViewStyle>} onPress={onPress}>
      <Text style={styles.textButton as StyleProp<ViewStyle>}>{title}</Text>
    </TouchableHighlight>
  );
};

export default Button;
