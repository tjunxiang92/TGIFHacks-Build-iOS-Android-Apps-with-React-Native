# TGIFHacks Build iOS Android Apps with React Native

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
        <Card title="Local Modules">
          <AssetExample />
        </Card>
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



## React Navigation

```javascript
import React from 'react';
import { StackNavigator } from 'react-navigation';
import {
  IndexScreen,
} from '../screens';

const RootStackNavigator = StackNavigator(
  {
    IndexScreen: {
      screen: IndexScreen,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />;
  }
}
```

## Storage

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
