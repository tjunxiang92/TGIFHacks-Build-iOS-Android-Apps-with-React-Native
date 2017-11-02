'use strict';

import React, { Component } from 'react';
import styles from '../styles/styles';

import {
  View,
  FlatList,
  Alert,
  Button,
  Text,
} from 'react-native';

import TodoItem from '../components/TodoItem';

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Todo List"
  }
  constructor(props) {
    super(props);
  
    this.state = {
      todos: [
        { todoId: 1, txt: 'Learn react native', complete: false },
        { todoId: 2, txt: 'Make a to-do app', complete: true },
      ],
      hide: false,
    };

    this.onPress = this.onPress.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  deleteItem(item) {
    let todos = this.state.todos.slice();
    const index = todos.map(d => d.todoId).indexOf(item.todoId);

    todos.splice(index, 1);
    this.setState({
        todos
      });
  }

  updateItem(item) {
    // Update Item
    if (item.todoId) {
      let todos = this.state.todos.slice();
      const index = todos.map(d => d.todoId).indexOf(item.todoId);
      todos[index] = item;
      this.setState({
        todos
      });

    // Create item
    } else {
      this.setState({
        todos: this.state.todos.concat([item])
      });
    }
  }

  onPress(item) {
    this.props.navigation.navigate('Edit', { 
      item,
      update: this.updateItem,
    });
  }

  onHidePress() {
    if (this.state.hide) {
      this.setState({
        todos: this.state.allTodos,
        hide: false,
      });
    } else {
      this.setState({
        allTodos: this.state.todos.slice(),
        todos: this.state.todos.filter(todo => !todo.complete),
        hide: true,
      })
    }
  }

  toggleComplete(item) {
    item.complete = !item.complete;
    this.updateItem(item);
  }

  onLongPress(item) {
    Alert.alert('Quick Menu', null, [
      { text: !item.complete ? 'Set Complete' : 'Set Uncomplete', onPress: () => this.toggleComplete(item) },
      { text: 'Delete', onPress: () => this.deleteItem(item) },
      { text: 'Edit', onPress: () => this.onPress(item) },
      { text: 'Cancel' },
    ]);
  }

  renderItem({ item }) {
    return (
      <TodoItem item={item}
        onPress={() => this.onPress(item)}
        onLongPress={() => this.onLongPress(item)}
        />
      )
  }

  renderEmpty() {
    if (!this.state.todos.length)
      return (<Text>Start adding some Todos</Text>);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderEmpty()}
      	<FlatList
		      data={this.state.todos}
		      renderItem={this.renderItem}
		      keyExtractor={(item, index) => index}
		      style={styles.listView}
		      />
        <Button
          onPress={() => this.onHidePress()}
          title={this.state.hide ? "Show Completed" : "Hide Completed"}
          />
        <Button
          onPress={() => this.onPress()}
          title="Add"
          />
      </View>
    );
  }
}

export default HomeScreen;