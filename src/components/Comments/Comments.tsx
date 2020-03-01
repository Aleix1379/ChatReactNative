import React, {useEffect, useState} from 'react';
import {ScrollView, StyleProp, Text, View, ViewStyle,} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {Comment, InitialState, Post, RootDispatcher} from '../../store/root-reducer';
import {WindowUtils} from '../../utils/WindowUtils';
import Button from '../Button/Button';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import Message from '../Message/Message';
import styles from './Comments.sass';
import SearchBox from "../SearchBox/SearchBox";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface StateProps {
  comments: Comment[];
  currentPostSelectedId: number;
}

const Comments: React.FC<Props> = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [commentsDataSource, setCommentsDataSource] = useState<Comment[]>([]);
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

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  useEffect(() => {
    if (comments.length !== commentsDataSource.length) {
      comments.forEach(comment => {
        if (commentsDataSource.findIndex(commentDataSource => commentDataSource.id === comment.id) === -1) {
          commentsDataSource.push(comment);
        }
      });
    }
  }, [comments]);

  useEffect(() => {
    const commentsFiltered = commentsDataSource.filter(comment =>
        comment.name.toLowerCase().includes(searchText.toLowerCase()) ||
        comment.email.toLowerCase().includes(searchText.toLowerCase()) ||
        comment.body.toLowerCase().includes(searchText.toLowerCase())
    );
    rootDispatcher.updateComments(commentsFiltered);
  }, [searchText]);

  return (
    <View style={styles.messageContainer}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <SearchBox
            value={searchText}
            placeholder="Search comments"
            onChangeText={setSearchText}
        />
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
          <Text style={styles.noData}>
            Choose a post to see the coments
          </Text>
        )}

        {comments.length === 0 && (
          <Text style={styles.noData}>
            There is no comments send a message to be the first
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
