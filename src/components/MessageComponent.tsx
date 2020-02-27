import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import theme from '../styles/theme.style';

interface Props {
  id: number;
  title: string;
  body: string;
  messagePressHandler(postId: number): void;
}

const MessageComponent: React.FC<Props> = ({
  id,
  title,
  body,
  messagePressHandler,
}) => {
  const capitalizeFirstLetter = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <TouchableHighlight onPress={() => messagePressHandler(id)}>
      <View style={styles.post}>
        <Text style={styles.title}>{capitalizeFirstLetter(title)}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  post: {
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
  },
  title: {
    fontSize: 18,
    color: theme.SECONDARY_COLOR,
  },
  body: {
    color: theme.WHITE_COLOR,
  },
});

export default MessageComponent;
