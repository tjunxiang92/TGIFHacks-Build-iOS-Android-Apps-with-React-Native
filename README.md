# TGIFHacks Build iOS Android Apps with React Native

## Initial Setup  
- On your smartphone, download the app [iOS](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8) & [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en)
- On your PC, go to https://snack.expo.io/

## Javascript Basics

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
        <Text style={styles.paragraph}>
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

```

## Components and Screens

## Props & State
https://facebook.github.io/react-native/docs/props.html
https://facebook.github.io/react-native/docs/state.html

```
// TodoList.js
<TodoRow name={this.todo} />

// TodoRow.js
render() {
  <Text>
    {this.props.name}
  </Text>
}
```


```
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

## API Calls
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
