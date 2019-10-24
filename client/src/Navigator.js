import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ExploreScreen from './screens/ExploreScreen';
import NoteScreen from './screens/NoteScreen';
import CameraScreen from './screens/CameraScreeen';
import NotesDetailsScreen from './screens/NoteDetailsScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
const AppNavigator = createStackNavigator(
  {
    Explore: {
      screen: ExploreScreen,
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
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
  },
  {
    initialRouteName: 'Login',
  },
);

export default createAppContainer(AppNavigator);
