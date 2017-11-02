import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditScreen';

import {
	StackNavigator
} from 'react-navigation';

export default StackNavigator({
  Home: {screen: HomeScreen},
  Edit: {screen: EditScreen},
})