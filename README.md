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

## Vertical Scrolling List
https://facebook.github.io/react-native/docs/flatlist.html
Component designed for efficient display of vertically scrolling lists of changing data. Examples include Contacts app, Whatsapp Group

### Workshop Time!
1. https://snack.expo.io/HkmWG9YC-
2. In `app.js: 63`, update the code.
```javascript
<FlatList
      data={this.state.todos}
      renderItem={({ item }) => (<TodoItem item={item} onPress={() => this.onPress(item)}/>)}
      keyExtractor={(item, index) => index}
      style={styles.listView}
      />
```
3. How can you generate 50 items instead of 20?
[Completed Version](https://snack.expo.io/S1s1b5YCW)

## React Navigation
https://reactnavigation.org/

### Screens
Screens are essentially components. They are different in a sense where they belong to themselves and not dependant on another component to use them.

### Routes
This is how routes are defined. There are two main Navigators:
- StackNavigator - Provides a way for your app to transition between screens where each new screen is placed on top of a stack. Example: WhatsApp (We will only be using this).
- TabNavigator - Used to easily set up a screen with several tabs. Example: Instagram.
- DrawerNavigator - Side Panel where it provides functionality such as Profiles.

StackNavigator
```javascript
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditScreen';

import {
	StackNavigator
} from 'react-navigation';

// Define all your routes
export default StackNavigator({
  Home: {screen: HomeScreen},
  Edit: {screen: EditScreen},
})
```

In a Screen Component, this is the function to navigate to another screen.
```javascript
this.props.navigation.navigate('Edit', { params });
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

### Title Text
This puts a title on the Status Bar.
```
class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Todo List"
    };
```

### Props
When passing props between `Screens`, instead of 
```
this.props
``` 
it is 
```
this.props.navigation.state.params
```

### Workshop Time!
`app.js` content has been moved into `HomeScreen.js`. Let's click on an item and show that that is an item to be edited.
1. https://snack.expo.io/rJPl8qFAW
2. Update `HomeScreen.js: 36` to navigate to `EditScreen.js` and pass `item` as params.
3. In `EditScreen.js`, edit the code to display the item passed, if not, show it as `New Item`

[Completed Version](https://snack.expo.io/BkTyY5tCb)

## Forms
https://github.com/gcanti/tcomb-form-native
Easy way to create forms for user to fill up content.

### Headers
```
var Form = t.form.Form;

var Todo = t.struct({
	todoId: t.maybe(t.Integer),
	txt: t.Str,
	complete: t.Bool
});

var options = {
    fields: {
    	todoId: {
    		hidden: true
    	},
        txt: {
            label: 'To-Do Item',
            placeholder: 'enter a to do item here',
            autoFocus: true
        }
    }
};
```

### Display Form to User
```
<Form
    ref="form"
    type={Todo}
    onChange={this._onChange}
    options={options}
    value={item}/>
```

### Reading Results from Form
```
var value = this.refs.form.getValue();
```

### Workshop Time!
Try adding a new field, like a date field.
1. https://snack.expo.io/BJg0y2cKAW
2. In `EditScreen.js`, Look into https://github.com/gcanti/tcomb-form-native#dates and Add a Date field
3. In `TodoItem.js`, Display your dates

* There might be some bugs
[Completed Version](https://snack.expo.io/BkTGT9KRZ)

## Storage
https://facebook.github.io/react-native/docs/asyncstorage.html
Storing data into the phone database itself

### Persisting Data
```javascript
try {
  await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
} catch (error) {
  // Error saving data
}
```

### Fetching Data
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

### Workshop Time!
https://snack.expo.io/HJDyCqKCW
Let's try storing your mode selected to `Hide/Show Completed` into the database

[Completed](https://snack.expo.io/HJDyCqKCW)

## Network Calls
https://facebook.github.io/react-native/docs/network.html
Network calls allows you to access an API resource on the internet.

### GET Request
```javascript
try {
	const data = await fetch('https://2fc2398d.ngrok.io/todos');
	this.initialise(await data.json());
} catch (err) {
	console.log(err);
}
```

### POST Request
```javascript
try {
	const data = await fetch('https://2fc2398d.ngrok.io/todos', {
	  method: 'POST',
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(item)
	});
	return await data.json();
} catch (err) {
	console.log(err);
}
```

### Workshop Time!
https://snack.expo.io/BycasnYC-
Implement the `createTodo` & `updateTodo` functions

[Completed](https://snack.expo.io/H1Pj0ctAZ)

## Further Reading
- Redux - http://redux.js.org/docs/basics/
- React Native Resources - https://github.com/jondot/awesome-react-native
- React Native Newsletter - http://reactnative.cc/