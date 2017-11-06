import styles from '../styles/styles'
import React from 'react';
import {
  Text, View, TouchableHighlight,
} from 'react-native';

export default (props) => {
  return (
    <View>
      <TouchableHighlight
        onPress={props.onPress}
        onLongPress={props.onLongPress}
      >
        <View style={styles.container}>
          <Text style={[styles.txt, props.todo.complete && styles.completed]}>
            {props.todo.txt}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
