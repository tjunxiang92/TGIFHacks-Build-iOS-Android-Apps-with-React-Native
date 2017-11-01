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

### React Native Template

```javascript

```

## Components and Screens



## React Navigation

## Storage
