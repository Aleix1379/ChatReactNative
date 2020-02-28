import {AppRegistry} from 'react-native';

import AppWrapper from './AppWrapper';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppWrapper);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
});
