# TGIFHacks Build iOS Android Apps with React Native

## Table of Contents
1. [Initial Setup](#initial-setup)
2. [React Native Basics](#react-native-basics)  
    2.1. [One Way Binding](#one-way-binding)  
    2.2. [Components](#components)  
    2.3. [Props](#props)  
    2.4. [State](#state)  
3. [ListView](#listview)
4. [React Navigation](#react-navigation)
5. [Storage](#storage)
6. [Network Calls](#network-calls)

## Initial Setup  
- On your smartphone, download the app [iOS](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8) & [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en)
- On your PC, go to https://snack.expo.io/

## React Native Basics

```javascript
// Import Libraries
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

// Import Local Files
import AssetExample from './components/AssetExample';

// React Component
export default class App extends Component {
  // Lifecycle
  // constructor() -> render() -> componentDidMount()
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    this.setState({
      ...
    });
  }
  
  // Generate UI
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Change code in the editor and watch it change on your phone!
          Save to get a shareable url.
        </Text>
      </View>
    );
  }
}

// CSS Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
```

### One Way Binding
![One way binding](http://voidcanvas.com/wp-content/uploads/2014/04/facebook-react-two-way-data-binding.png)


### Components
![Components Breakdown](http://nitrajka.com/wp-content/uploads/2016/08/uimockscript.png)

### Props
https://facebook.github.io/react-native/docs/props.html
Props are parameters for components. Think of it as initialising the parameters of a new class. These parameters are read-only. To update, we got to use a callback.

```javascript
// TodoList.js
<TodoRow name={this.todo} onPress={this.onPress.bind(this)} />

// TodoRow.js
render() {
  <Text>
    {this.props.name}
    <Button onPress={this.props.onPress} name="Save" />
  </Text>
}
```

### State
https://facebook.github.io/react-native/docs/state.html
Props are set by the parent and they are fixed throughout the lifetime of a component. For data that is going to change, we have to use state.

```javascript
constructor() {
  super();
  this.state = {
    todos: []
  }
}

addTodo(todo) {
  this.setState({
    todos: this.state.todos.concat(todo),
  })
}
```

## ListView

https://facebook.github.io/react-native/docs/flatlist.html


## React Navigation
https://reactnavigation.org/

BasicApp.js
```javascript
import {
  StackNavigator,
} from 'react-navigation';

const BasicApp = StackNavigator({
  Main: {screen: MainScreen},
  Profile: {screen: ProfileScreen},
});
```

MainScreen.js
```javascript
class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigate('Profile', { name: 'Jane' })
        }
      />
    );
  }
}
```

ProfileScreen.js
```javascript
class ProfileScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,
  });
  render() {
    const { goBack } = this.props.navigation;
    return (
      <Button
        title="Go back"
        onPress={() => goBack()}
      />
    );
  }
}
```

## AsyncStorage
https://facebook.github.io/react-native/docs/asyncstorage.html

Persisting Data
```javascript
try {
  await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
} catch (error) {
  // Error saving data
}
```

Fetching Data
```javascript
try {
  const value = await AsyncStorage.getItem('@MySuperStore:key');
  if (value !== null){
    // We have data!!
    console.log(value);
  }
} catch (error) {
  // Error retrieving data
}
```

## Network Calls
https://facebook.github.io/react-native/docs/network.html

```javascript
async function getMoviesFromApi() {
  try {
    let response = await fetch('https://facebook.github.io/react-native/movies.json');
    let responseJson = await response.json();
    return responseJson.movies;
  } catch(error) {
    console.error(error);
  }
}
```

## Further Reading
- Redux - http://redux.js.org/docs/basics/
- React Native Resources - https://github.com/jondot/awesome-react-native
- React Native Newsletter - http://reactnative.cc/
