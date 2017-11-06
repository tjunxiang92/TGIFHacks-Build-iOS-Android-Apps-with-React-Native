import React, { Component } from 'react';

import {
  View,
  FlatList,
  Alert,
  Button,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleComplete,
  updateSearch,
} from '../actions/todos';

import { connect } from 'react-redux';

import styles from '../styles/styles';
import TodoItem from '../components/TodoItem';

/**
 * HomeScreen for TodoList
 */
class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Todo List',
  };

  constructor(props) {
    super(props);

    // Bindings
    this.onPress = this.onPress.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
  }

  onPress(todo) {
    this.props.navigation.navigate('Edit', { todo });
  }

  onLongPress(todo) {
    Alert.alert('Quick Menu', null, [
      { text: !todo.complete ? 'Set Complete' : 'Set Uncomplete', onPress: () => this.props.dispatch(updateTodo({ ...todo, complete: !todo.complete })) },
      { text: 'Delete', onPress: () => this.props.dispatch(deleteTodo(todo)) },
      { text: 'Edit', onPress: () => this.onPress(todo) },
      { text: 'Cancel' },
    ]);
  }

  getTodos() {
    return this.props.todos
      .filter(todo => !this.props.hide || !todo.complete)
      .filter(todo => todo.txt.indexOf(this.props.search) !== -1);
  }

  renderEmpty() {
    if (this.props.loading) {
      return (<ActivityIndicator />);
    } else if (!this.props.todos.length) {
      return (<Text>Start adding some Todos</Text>);
    }

    return null;
  }

  render() {
    const renderItem = ({ item }) => (
      <TodoItem
        todo={item}
        onPress={() => this.onPress(item)}
        onLongPress={() => this.onLongPress(item)}
      />
    );

    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Search..."
          onChangeText={search => this.props.dispatch(updateSearch(search))}
          style={styles.textInput}
        />
        {this.renderEmpty()}

        <FlatList
          data={this.getTodos()}
          renderItem={renderItem}
          keyExtractor={(todo, index) => index}
          style={styles.listView}
        />
        <Button
          onPress={() => this.props.dispatch(toggleComplete())}
          title={this.props.hide ? 'Show Completed' : 'Hide Completed'}
        />
        <Button
          onPress={() => this.onPress()}
          title="Add"
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { todos, hide, search } = state.todos;

  return {
    todos,
    hide,
    search,
  };
};

export default connect(mapStateToProps)(HomeScreen);
