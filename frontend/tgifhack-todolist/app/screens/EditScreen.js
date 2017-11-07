import t from 'tcomb-form-native'; // 0.6.11
import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/styles';

import {
  updateTodo,
  addTodo,
} from '../actions/todos';

const { Form } = t.form;

const Todo = t.struct({
  todoId: t.maybe(t.Integer),
  txt: t.String,
  complete: t.Boolean,
});

const options = {
  auto: 'placeholders',
  fields: {
    todoId: {
      hidden: true,
    },
    txt: {
      label: 'To-Do Item',
      placeholder: 'enter a to do item here',
      autoFocus: true,
    },
  },
};

class EditScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit Todo',
  };

  constructor(props) {
    super(props);
    const { todo } = this.props.navigation.state.params;
    this.state = {
      todo,
    };

    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate() {
    const { goBack } = this.props.navigation;
    const todo = this.state.todo;

    if (todo) {
      goBack();
      this.props.dispatch(todo.todoId ? updateTodo(todo) : addTodo(todo));
    }
  }

  onChange(todo) {
    this.setState({ todo });
  }

  render() {
    return (
      <View style={styles.todo}>
        <Form
          type={Todo}
          onChange={this.onChange}
          options={options}
          value={this.state.todo}
        />
        <TouchableHighlight
          style={[styles.button, styles.saveButton]}
          onPress={this.onUpdate}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default connect()(EditScreen);
