import {AppRegistry} from 'react-native';
// import AppWrapper from './src/AppWrapper';
import AppWrapper from './src/AppNav';
import {name as appName} from './src/app.json';

AppRegistry.registerComponent(appName, () => AppWrapper);
