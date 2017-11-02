'use strict';
var React = require('react-native');
var { StyleSheet } = React;

var styles = StyleSheet.create({

    navigator: {flex: 1},

    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#ffffff',
    },

    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },

    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },

    saveButton: {
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
    },

    newButton: {
        marginBottom: 0,
        borderRadius: 0,
    },

    todo: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffff',
    },

    txt: {
        fontSize: 18,
        marginLeft: 5,
        marginTop: 2,
        color: '#222222',
    },

    completed: {
        color: '#cccccc',
        textDecorationLine: 'line-through'
    },
});


module.exports = styles;
