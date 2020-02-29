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
import UserScreen from './screens/UserScreen/UserScreen';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser, faComments} from '@fortawesome/free-solid-svg-icons';
import MapScreen from "./screens/MapScreen/MapScreen";

const PostsStack = createStackNavigator(
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

const UserStack = createStackNavigator(
  {
    User: {
      screen: UserScreen,
      navigationOptions: {headerShown: false},
    },
    Map: MapScreen,
  },
  {
    initialRouteName: 'User',
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
    Posts: {
      screen: PostsStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <FontAwesomeIcon size={22} color={tintColor} icon={faComments} />
        ),
      },
    },
    Profile: {
      screen: UserStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <FontAwesomeIcon size={22} color={tintColor} icon={faUser} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Posts',
    activeColor: theme.SECONDARY_COLOR,
    inactiveColor: theme.LIGHT_COLOR,
    barStyle: {backgroundColor: theme.PRIMARY_COLOR},
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
