import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import 'react-native-gesture-handler';

import CommentsScreen from './screens/CommentsScreen/CommentsScreen';
import PostsScreen from './screens/PostsScreen/PostsScreen';

import theme from './styles/theme.style';
import NewPostModal from './screens/NewPostModal/NewPostModal';
import NewCommentModal from './screens/NewCommentModal/NewCommentModal';
import ErrorModal from './screens/ErrorModal/ErrorModal';

const HomeStack = createStackNavigator(
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
    Error: {
      screen: ErrorModal,
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

const BottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    Profile: {
      screen: HomeStack,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

// const container = createAppContainer(Home);

export default createAppContainer(
  createSwitchNavigator(
    {
      App: BottomTabNavigator,
    },
    {
      initialRouteName: 'App',
    },
  ),
);

// export default container;
