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
  title: string;

  onBackPressHandler(): void;
}

const getCommentsHeaderStyles = (): StyleProp<ViewStyle> => {
  let style: ViewStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 0,
  };
  if (WindowUtils.isDesktop()) {
    style.marginHorizontal = 15;
  }
  return style;
};

const CommentsHeaderComponent: React.FC<Props> = ({
  title,
  onBackPressHandler,
}) => {
  return (
    <View style={getCommentsHeaderStyles()}>
      {WindowUtils.isMobile() && (
        <TouchableHighlight onPress={onBackPressHandler}>
          <Text style={styles.back}>Back</Text>
        </TouchableHighlight>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
