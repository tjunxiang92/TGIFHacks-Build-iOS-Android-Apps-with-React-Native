# TGIFHacks Build iOS Android Apps with React Native

## Table of Contents
1. [Initial Setup](#initial-setup)
2. [React Native Basics](#react-native-basics)  
    2.1. [Components](#components)  
    2.2. [Props](#props)  
    2.3. [State](#state)  
    2.4. [One Way Binding](#one-way-binding)  
3. [Displaying List](#displaying-list)
4. [React Navigation](#react-navigation)
5. [Forms](#forms)
6. [Storage](#storage)
7. [Network Calls](#network-calls)

## Initial Setup  
1. On your smartphone, download the app [iOS](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8) & [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en)
2. On your PC, go to https://snack.expo.io/
3. Go to https://expo.io/@junxiang92/tgifhack-todolist and scan the QR Code in Expo App

### Optional
3. Download https://expo.io/tools and Install.
4. Download https://nodejs.org/en/download/ and Install.
5. Download the project [here](https://github.com/tjunxiang92/TGIFHacks-Build-iOS-Android-Apps-with-React-Native/archive/master.zip).
6. Open a `cmd/Terminal` on `Windows/Mac` and navigate to the folder.
7. Run `npm install`.
8. Open `Expo XDE` and Open the Project.
9. Click `Share` and scan the QR Code using the Expo Client on your smartphone.,

## React Native Basics
https://reactjs.org/
React is built by Facebook and advertised as *learn once write anywhere*. Today, React can be used to build the following applications.
1. Web Applications - https://github.com/facebook/react
2. Mobile Applications - https://github.com/facebook/react-native
3. Console Applications - https://github.com/Yomguithereal/react-blessed
4. Desktop Applications - https://github.com/electron/electron

### Basic Structure
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

### Components
Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. In this workshop, we will be splitting Components into `screens` and `components` folder but both would mean the same thing.
![Components Breakdown](http://nitrajka.com/wp-content/uploads/2016/08/uimockscript.png)

#### Workshop Time!
1. Open up https://snack.expo.io/SJv1NOYRZ and load it onto your mobile phone
2. Change some of the text and see how it works
3. Find where to change up the text inside of `<AssetExample />`
4. Try copying and pasting `<AssetExample />`, what happens?
5. Replace `<AssetExample />` with `<TodoItem />`
6. Delete `<AssetExample />`

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

#### Workshop Time!
Edit `TodoItem.js` to use props from `app.js`

1. https://snack.expo.io/HyLRUdt0W
2. In `app.js: 26`, Add `todos.map(todo => (<TodoItem item={todo}/>))`
3. In `TodoItem.js: 7`, Replace `var item = ...` with `var item = this.props.item`
4. Play around with it. Try adding a date field. `<TodoItem item={todo} date="3 Nov" />`

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

#### Workshop Time!
Add a `Button` that adds new Todos
1. https://snack.expo.io/rkOa9utRW
2. Copy the array with `let todos = this.state.todos.slice()`
3. Add a new todo with `todos.push(todo)`
4. Set the new state `this.setState({ todos })`
5. Try to create a button that delete todos

### One Way Binding
https://hashnode.com/post/why-does-react-emphasize-on-unidirectional-data-flow-and-flux-architecture-ciibz8ej600n2j3xtxgc0n1f0
React unlike Angular does not allow you to update a parent class data from a child class. This allows data to flow in a single direction and allow the management of the state to be handled in a single location.
![One way binding](http://voidcanvas.com/wp-content/uploads/2014/04/facebook-react-two-way-data-binding.png)

#### Workshop Time!
Let's update a Todo when pressed.
1. https://snack.expo.io/rkf9aKKCb
2. Call a function when an `TodoItem` is pressed.
```
onItemPress(index) {
    let todos = this.state.todos.slice();
    // Update Todo
    todos[index].txt = "Updated Todo";
    this.setState({ todos });
}
```
3. In `app.js: 50`, Pass the function as props to `<TodoItem />`
`<TodoItem item={todo} index={i} onPress={this.onItemPress.bind(this)}/>` 
4. Try to change the code to delete when pressed instead
`todos.splice(index, 1);`

[Completed Version](https://snack.expo.io/HkwiaKtR-)

## Displaying List

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

## Forms
https://github.com/gcanti/tcomb-form-native

## Storage
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
