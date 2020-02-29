import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import 'react-native-gesture-handler';

import CommentsScreen from './screens/CommentsScreen';
import PostsScreen from './screens/PostsScreen';

import theme from './styles/theme.style';
import NewPostModal from './screens/NewPostModal';
import NewCommentModal from './screens/NewCommentModal';

const Home = createStackNavigator(
  {
    Posts: {
      screen: PostsScreen,
      navigationOptions: {headerShown: false},
    },
    Comments: {
      screen: CommentsScreen,
      navigationOptions: ({navigation}) => {
        if (
          navigation &&
          navigation.state &&
          navigation.state.params &&
          navigation.state.params.title
        ) {
          return {title: navigation.state.params.title};
        }
      },
    },
    NewPost: {
      screen: NewPostModal,
      navigationOptions: {headerShown: false},
    },
    NewComment: {
      screen: NewCommentModal,
      navigationOptions: {headerShown: false},
    },
  },
  {
    initialRouteName: 'Posts',
    navigationOptions: {
      headerTintColor: theme.SECONDARY_COLOR,
      headerStyle: {
        backgroundColor: theme.PRIMARY_COLOR,
      },
    },
  },
);

const container = createAppContainer(Home);

export default container;
