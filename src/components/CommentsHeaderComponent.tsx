import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import theme from '../styles/theme.style';

interface Props {
  title: string;
  onBackPressHandler(): void;
}

const CommentsHeaderComponent: React.FC<Props> = ({
  title,
  onBackPressHandler,
}) => {
  return (
    <View style={styles.commentsHeader}>
      <TouchableHighlight onPress={onBackPressHandler}>
        <Text style={styles.back}>Back</Text>
      </TouchableHighlight>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  commentsHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    backgroundColor: theme.DARK_COLOR,
    color: theme.SECONDARY_COLOR,
    height: 36,
    lineHeight: 36,
    fontSize: 18,
    paddingLeft: 8,
  },
  back: {
    height: 36,
    lineHeight: 36,
    backgroundColor: '#2196f3',
    color: '#fff',
    paddingHorizontal: 16,
  },
});

export default CommentsHeaderComponent;
