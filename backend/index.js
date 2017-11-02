const express = require('express');
const app = express();

// Handles JSON Body
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies

// Simulate a Database
let todos = [
	{
        "txt": "New Todo",
        "complete": false,
        "todoId": 1
    }
];
let todoId = todos.length;

// Finds the index based on ID
const findIndex = todo => {
	return todos.map(todo => todo.todoId).indexOf(todo.todoId);
}


// Create, Read, Update, Delete Functions
app.get('/todos', function (req, res) {
  res.send(todos)
})

app.post('/todos', function (req, res) {
	++todoId;
	todos.push({
		...req.body,
		todoId
	});
	res.send(todos);
});

app.patch('/todos', function (req, res) {
	const todo = req.body;
	todos[findIndex(todo)] = todo;
	res.send(todos);
});


app.delete('/todos', function (req, res) {
	const todo = req.body;
	todos.splice(findIndex(todo), 1);
	res.send(todos);
});

// Start the server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})