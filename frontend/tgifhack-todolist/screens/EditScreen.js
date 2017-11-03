'use strict';
import styles from '../styles/styles';
import t  from 'tcomb-form-native'; // 0.6.11
import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
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

class EditScreen extends React.Component {
    static navigationOptions = {
        title: "Edit Todo"
      };
  	onUpdate() {
  		const { goBack, state } = this.props.navigation;
	    var value = this.refs.form.getValue();

	    if (value) {
	        goBack();
	        state.params.update(value);
	    }
	}

  render() {
  	const item = this.props.navigation.state.params.item;
    return (
      <View style={styles.todo}>
        <Form
            ref="form"
            type={Todo}
            onChange={this._onChange}
            options={options}
            value={item}/>
        <TouchableHighlight
            style={[styles.button, styles.saveButton]}
            onPress={this.onUpdate.bind(this)}
            underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
    </View>
    );
  }
}

export default EditScreen;