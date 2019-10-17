import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './Home';
import NoteView from './NoteView';
import CameraView from './CameraView';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    NoteView: {
      screen: NoteView,
    },
    CameraView: {
      screen: CameraView,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator);
