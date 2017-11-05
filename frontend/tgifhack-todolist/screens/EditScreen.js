import t from 'tcomb-form-native'; // 0.6.11
import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';

import styles from '../styles/styles';

const { Form } = t.form;

const Todo = t.struct({
  todoId: t.maybe(t.Integer),
  txt: t.Str,
  give: t.Str,
  want: t.Str,
  lastCatchUp: t.Date,
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
    this.onUpdate = this.onUpdate.bind(this)
  }

  onUpdate() {
    const { goBack, state } = this.props.navigation;
    const value = this.refs.form.getValue();

    if (value) {
      goBack();
      state.params.update(value);
    }
  }

  render() {
    const { item } = this.props.navigation.state.params;

    return (
      <View style={styles.todo}>
        <Form
          ref="form"
          type={Todo}
          onChange={this.onChange}
          options={options}
          value={item}
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

export default EditScreen;
