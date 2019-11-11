import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from '../components/Icon';
import ExploreScreen from './ExploreScreen';
import PostScreen from './PostScreen';
import CameraScreen from './CameraScreeen';
import PostDetailsScreen from './PostDetailsScreen';
import LoginScreen from './LoginScreen';
import SettingsScreen from './SettingsScreen';
import LoadingScreen from './LoadingScreen';
import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';
import FriendRequestsScreen from './FriendRequestsScreen';
import FriendsScreen from './FriendsScreen';
import ProfileIcon from '../components/ProfileIcon';
import CommentsScreen from './CommentsScreen';
import CreateFeedScreen from './CreateFeedScreen';
import FeedDetailsScreen from './FeedDetailsScreen';

const AuthNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
});

const ExploreStack = createStackNavigator({
  Explore: ExploreScreen,
  PostDetails: PostDetailsScreen,
  Post: PostScreen,
  Camera: CameraScreen,
});

const FeedStack = createStackNavigator(
  {
    Feed: FeedScreen,
    CreateFeed: CreateFeedScreen,
    FeedDetails: FeedDetailsScreen,
    Post: PostScreen,
    Profile: ProfileScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      switch (navigation.state.routeName) {
        case 'Feed': {
          return {
            headerBackTitle: null,
          };
        }
      }
    },
  },
);

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  FriendRequests: FriendRequestsScreen,
  Friends: FriendsScreen,
  PostDetails: PostDetailsScreen,
  Post: PostScreen,
  Comments: CommentsScreen,
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

const BottomNavigator = createBottomTabNavigator(
  {
    Notifications: SettingsStack,
    Explore: ExploreStack,
    Feed: FeedStack,
    Profile: ProfileStack,
    Settings: SettingsStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const color = focused ? '#0275d8' : 'gray';
        const style = { fontSize: 32, color };
        switch (navigation.state.routeName) {
          case 'Explore': {
            return <Icon style={style} name="navigate" />;
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
          case 'Notifications': {
            return <Icon style={style} name="notifications" />;
          }
        }
      },
    }),
    resetOnBlur: true,
    tabBarOptions: {
      showLabel: false,
    },
    initialRouteName: 'Feed',
  },
);

export default createAppContainer(
  createSwitchNavigator({
    Loading: LoadingScreen,
    Auth: AuthNavigator,
    App: BottomNavigator,
  }),
);
