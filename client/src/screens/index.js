import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from '../components/Icon';
import ExploreScreen from './ExploreScreen';
import NoteScreen from './NoteScreen';
import CameraScreen from './CameraScreeen';
import NotesDetailsScreen from './NoteDetailsScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import SettingsScreen from './SettingsScreen';
import LoadingScreen from './LoadingScreen';
import SearchScreen from './SearchScreen';
import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';
import FriendRequestsScreen from './FriendRequestsScreen';
import FriendsScreen from './FriendsScreen';
import ProfileIcon from '../components/ProfileIcon';

const AuthNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
});

const ExploreStack = createStackNavigator({
  Explore: ExploreScreen,
  Note: NoteScreen,
  NoteDetails: NotesDetailsScreen,
  Camera: CameraScreen,
});

const SearchStack = createStackNavigator({
  Search: SearchScreen,
});

const FeedStack = createStackNavigator({
  Feed: FeedScreen,
});

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  FriendRequests: FriendRequestsScreen,
  Friends: FriendsScreen,
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

const BottomNavigator = createBottomTabNavigator(
  {
    Search: SearchStack,
    Explore: ExploreStack,
    Feed: FeedStack,
    Profile: ProfileStack,
    Settings: SettingsStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const color = focused ? '#0275d8' : 'gray';
        const style = { fontSize: 32, color };
        switch (navigation.state.routeName) {
          case 'Explore': {
            return <Icon style={style} name="navigate" />;
          }
          case 'Search': {
            return <Icon style={style} name="search" />;
          }
          case 'Settings': {
            return <Icon style={style} name="settings" />;
          }
          case 'Feed': {
            return <Icon style={style} name="list" />;
          }
          case 'Profile': {
            return <ProfileIcon style={style} />;
          }
        }
      },
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
    initialRouteName: 'Explore',
  },
);

export default createAppContainer(
  createSwitchNavigator({
    Loading: LoadingScreen,
    Auth: AuthNavigator,
    App: BottomNavigator,
  }),
);
