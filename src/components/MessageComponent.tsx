import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';
import theme from '../styles/theme.style';
import {WindowUtils} from '../utils/WindowUtils';

interface Props {
  id: number;
  title: string;
  body: string;
  isSelected?: boolean;
  messagePressHandler?: (postId: number, name: string) => void;
}

const MessageComponent: React.FC<Props> = ({
  id,
  title,
  body,
  isSelected,
  messagePressHandler,
}) => {
  const capitalizeFirstLetter = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  const selectMessage = () => {
    messagePressHandler && messagePressHandler(id, title);
  };

  const getMessageStyle = (): StyleProp<ViewStyle> => {
    const style = {
      backgroundColor: theme.PRIMARY_COLOR,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      marginBottom: 8,

      paddingHorizontal: 8,
      paddingVertical: 4,
    };
    if (isSelected && WindowUtils.isDesktop()) {
      style.backgroundColor = theme.DARK_COLOR;
    }
    return style;
  };

  return (
    <TouchableHighlight onPress={selectMessage}>
      <View style={getMessageStyle()}>
        <Text style={styles.title}>{capitalizeFirstLetter(title)}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: theme.SECONDARY_COLOR,
  },
  body: {
    color: theme.WHITE_COLOR,
  },
});

export default MessageComponent;
