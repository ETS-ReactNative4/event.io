import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from '../components/Icon'
import LoadingScreen from './LoadingScreen'
import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'
import ExploreScreen from './ExploreScreen'
import FeedScreen from './FeedScreen'
import ProfileScreen from './ProfileScreen'
import SettingsScreen from './SettingsScreen'
import FeedDetailsScreen from './FeedDetailsScreen'
import CreatePostScreen from './CreatePostScreen'
import CreateFeedScreen from './CreateFeedScreen'
import FriendRequestsScreen from './FriendRequestsScreen'
import UserListScreen from './UserListScreen'
import ProfileIcon from '../components/ProfileIcon'
import {
  fromBottom,
  fromTop,
  fromRight,
  zoomIn,
  zoomOut
} from 'react-navigation-transitions'

const TRANSITION_TIME = 1000 * 0.61803
const GOLDEN_RATIO = 1.61803

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen
  }
})

const AppStack = {
  Home: HomeScreen,
  FriendRequests: FriendRequestsScreen,
  Explore: ExploreScreen,
  Feed: FeedScreen,
  Profile: ProfileScreen,
  Settings: SettingsScreen,
  FeedDetails: FeedDetailsScreen,
  UserList: UserListScreen,
  Post: CreatePostScreen,
  CreateFeed: CreateFeedScreen
}

const ExploreStack = createStackNavigator(AppStack, {
  initialRouteName: 'Explore',
  transitionConfig: nav => handleTransitions(nav),
  defaultNavigationOptions: ({ navigation }) => {
    switch (navigation.state.routeName) {
      case 'Feed': {
        return {
          headerBackTitle: null
        }
      }
    }
  }
})

const FeedStack = createStackNavigator(AppStack, {
  initialRouteName: 'Feed',
  transitionConfig: nav => handleTransitions(nav),
  defaultNavigationOptions: ({ navigation }) => {
    switch (navigation.state.routeName) {
      case 'Feed': {
        return {
          headerBackTitle: null
        }
      }
    }
  }
})
const ProfileStack = createStackNavigator(AppStack, {
  initialRouteName: 'Profile',
  transitionConfig: nav => handleTransitions(nav)
})
const SettingsStack = createStackNavigator(AppStack, {
  initialRouteName: 'Settings',
  transitionConfig: nav => handleTransitions(nav)
})
const HomeStack = createStackNavigator(AppStack, {
  initialRouteName: 'Home',
  transitionConfig: nav => handleTransitions(nav)
})

const BottomNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Explore: ExploreStack,
    Feed: FeedStack,
    Profile: ProfileStack,
    Settings: SettingsStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const color = focused ? '#0275d8' : 'gray'
        const style = { fontSize: 32, color }
        switch (navigation.state.routeName) {
          case 'Explore': {
            return <Icon style={style} name='navigate' />
          }
          case 'Settings': {
            return <Icon style={style} name='settings' />
          }
          case 'Feed': {
            return <Icon style={style} name='list' />
          }
          case 'Profile': {
            return <ProfileIcon style={style} />
          }
          case 'Home': {
            return <Icon style={style} name='home' />
          }
        }
      }
    }),
    resetOnBlur: true,
    tabBarOptions: {
      showLabel: false
    },
    initialRouteName: 'Home'
  }
)

function handleTransitions({ scenes }) {
  const prevScene = scenes[scenes.length - 2]
  const nextScene = scenes[scenes.length - 1]

  if (nextScene.route.routeName === 'Post') {
    return fromBottom(TRANSITION_TIME / GOLDEN_RATIO)
  }
  if (nextScene.route.routeName === 'CreateFeed') {
    return fromBottom(TRANSITION_TIME / GOLDEN_RATIO)
  }
  if (
    prevScene &&
    prevScene.route.routeName === 'Explore' &&
    nextScene.route.routeName === 'FeedDetails'
  ) {
    return zoomIn(TRANSITION_TIME / GOLDEN_RATIO)
  }
  if (
    prevScene &&
    prevScene.route.routeName === 'Home' &&
    nextScene.route.routeName === 'FeedDetails'
  )
    return fromTop(TRANSITION_TIME / GOLDEN_RATIO)
}

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      Auth: AuthStack,
      App: BottomNavigator
    },
    {}
  )
)
