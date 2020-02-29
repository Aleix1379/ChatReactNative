import React from 'react';
import CommentsComponent from '../components/CommentsComponent';
import {NavigationScreenProp, NavigationState} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const CommentsScreen: React.FC<Props> = ({navigation}) => {
  return <CommentsComponent navigation={navigation} />;
};

export default CommentsScreen;
