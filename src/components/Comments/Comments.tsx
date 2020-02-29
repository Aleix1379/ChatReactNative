import React from 'react';
import {ScrollView, StyleProp, Text, View, ViewStyle,} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import {Comment, InitialState} from '../../store/root-reducer';
import {WindowUtils} from '../../utils/WindowUtils';
import Button from '../Button/Button';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import Message from '../Message/Message';
import styles from './Comments.sass';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface StateProps {
  comments: Comment[];
  currentPostSelectedId: number;
}

const Comments: React.FC<Props> = ({navigation}) => {
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
            <Message
              key={comment.id}
              id={comment.id!}
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

export default Comments;
