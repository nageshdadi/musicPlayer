/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => require('./components/Service'));
AppRegistry.registerComponent(appName, () => App);
