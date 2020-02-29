import React from 'react';
import Comments from '../../components/Comments/Comments';
import {NavigationScreenProp, NavigationState} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const CommentsScreen: React.FC<Props> = ({navigation}) => {
  return <Comments navigation={navigation} />;
};

export default CommentsScreen;
