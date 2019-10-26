import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ExploreScreen from './ExploreScreen';
import NoteScreen from './NoteScreen';
import CameraScreen from './CameraScreeen';
import NotesDetailsScreen from './NoteDetailsScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import SettingsScreen from './SettingsScreen';
import LoadingScreen from './LoadingScreen';
import SearchScreen from './SearchScreen';

const AppNavigator = createStackNavigator({
  Explore: {
    screen: ExploreScreen,
  },
  Search: {
    screen: SearchScreen,
  },
  Note: {
    screen: NoteScreen,
  },
  Camera: {
    screen: CameraScreen,
  },
  NoteDetails: {
    screen: NotesDetailsScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
});

const AuthNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
});

export default createAppContainer(
  createSwitchNavigator({
    Loading: LoadingScreen,
    Auth: AuthNavigator,
    App: AppNavigator,
  }),
);
