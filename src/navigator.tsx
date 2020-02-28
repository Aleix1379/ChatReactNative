import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import 'react-native-gesture-handler';

import Feed from './screens/Feed';
import Profile from './screens/User';

const Home = createStackNavigator(
  {
    Profile: Profile,
    Feed: Feed,
  },
  {
    initialRouteName: 'Profile',
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#000',
      },
    },
  },
);

const container = createAppContainer(Home);

export default container;
