'use strict';

import React, { Component } from 'react';
import styles from '../styles/styles';

import {
  View,
  FlatList,
  Alert,
  Button,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import TodoItem from '../components/TodoItem';
import Database from '../apis/NetworkStorage';

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Todo List"
  };

  constructor(props) {
    super(props);
  
    this.state = {
      todos: [
        // { todoId: 1, txt: 'Learn react native', complete: false },
        // { todoId: 2, txt: 'Make a to-do app', complete: true },
      ],
      hide: false,
      loading: true,
      search: '',
    };

    // Bindings
    this.onPress = this.onPress.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.updateState = this.updateState.bind(this);

    // Local Model
    this.database = new Database(this.updateState);    
  }

  // Updates the state and write to the database
  updateState(state) {
    this.setState({
      todos: state,
      loading: false,
    });
  }

  deleteItem(item) {
    this.database.delete(item);
  }

  updateItem(item) {
    // Create and Update Item
    if (item.todoId) {
      this.database.update(item);
    } else {
      this.database.create(item);
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
        todos: this.database.read(false, this.state.search),
        hide: false,
      });
    } else {
      this.setState({
        todos: this.database.read(true, this.state.search),
        hide: true,
      })
    }
  }

  toggleComplete(item) {
    const itemDup = {...item};
    itemDup.complete = !item.complete;
    this.updateItem(itemDup);
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

  onSearch(search) {
    this.setState({
      todos: this.database.read(this.state.hide, search),
      search
    });
  }

  renderEmpty() {
    if (this.state.loading)
      return (<ActivityIndicator />)
    if (!this.state.todos.length)
      return (<Text>Start adding some Todos</Text>);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Search..."
          onChangeText={(search) => this.onSearch(search)}
          style={styles.textInput}
          />
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