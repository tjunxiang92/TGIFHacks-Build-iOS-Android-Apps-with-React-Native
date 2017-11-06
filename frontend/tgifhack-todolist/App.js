import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, connect } from 'react-redux';

import Navigator from './config/routes';

import {
	StackNavigator,
	addNavigationHelpers,
} from 'react-navigation';

import store from './config/store';

export default () => (
  <Provider store={store}>
		<Navigator />
	</Provider>
);

// TODO: Add Navigator to Redux
// const App = ({ dispatch, nav }) => (
//   <Navigator
//     navigation={addNavigationHelpers({
// 			dispatch,
// 			state: nav,
// 		})}
// 	/>
// );
//
// const mapStateToProps = state => ({
// 	nav: state.nav,
// });
//
// const AppWithNavigation = connect(mapStateToProps)(App);

// export default() => {
// 	<Provider store={store}>
// 		<AppWithNavigation />
// 	</Provider>
// }
