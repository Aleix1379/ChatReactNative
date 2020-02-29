import React from 'react';
import {
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
  Text,
  StyleSheet,
} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import {Comment, InitialState} from '../store/root-reducer';
import MessageComponent from './MessageComponent';
import {WindowUtils} from '../utils/WindowUtils';
import theme from '../styles/theme.style';
import Button from './Button';
import {NavigationScreenProp, NavigationState} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface StateProps {
  comments: Comment[];
  currentPostSelectedId: number;
}

const CommentsComponent: React.FC<Props> = ({navigation}) => {
  const {comments, currentPostSelectedId} = useSelector<
    InitialState,
    StateProps
  >((state: InitialState) => {
    return {
      comments: state.comments,
      currentPostSelectedId: state.currentPostSelectedId,
    };
  }, shallowEqual);

  const getMessagesStyles = (): StyleProp<ViewStyle> => {
    let style = {
      paddingHorizontal: 0,
    };
    if (WindowUtils.isDesktop()) {
      style.paddingHorizontal = 15;
    }
    return style;
  };

  const getNewMessageStyles = (): StyleProp<ViewStyle> => {
    const style = {
      marginHorizontal: 0,
      paddingHorizontal: 4,
      paddingVertical: 4,
    };
    if (WindowUtils.isDesktop()) {
      style.marginHorizontal = 15;
      style.paddingHorizontal = 0;
    }
    return style;
  };

  return (
    <View style={styles.messageContainer}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={getMessagesStyles()}>
          {comments.map((comment: Comment) => (
            <MessageComponent
              key={comment.id}
              id={comment.id}
              title={comment.name}
              body={comment.body}
            />
          ))}
        </View>

        {currentPostSelectedId === -1 && (
          <Text style={styles.noPostSelectedMessage}>
            Choose a post to see the coments
          </Text>
        )}
      </ScrollView>

      <View style={getNewMessageStyles()}>
        <Button
          title="New comment"
          onPress={() => navigation.navigate('NewComment')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {flex: 1},
  noPostSelectedMessage: {
    height: WindowUtils.getWindowHeight(),
    lineHeight: WindowUtils.getWindowHeight(),
    textAlign: 'center',
    fontSize: 32,
    color: theme.SECONDARY_COLOR,
  },
});

export default CommentsComponent;
