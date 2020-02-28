import React from 'react';
import {Text, View} from 'react-native';
import {shallowEqual, useSelector, connect} from 'react-redux';
import {Comment, InitialState} from '../store/root-reducer';

interface Props {}

interface StateProps {
  comments: Comment[];
}

const CommentsComponent: React.FC<Props> = () => {
  const {comments} = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        comments: state.comments,
      };
    },
    shallowEqual,
  );

  return (
    <View>
      <Text>I am the comments</Text>
      <Text>{JSON.stringify(comments, null, 2)}</Text>
    </View>
  );
};

export default CommentsComponent;
