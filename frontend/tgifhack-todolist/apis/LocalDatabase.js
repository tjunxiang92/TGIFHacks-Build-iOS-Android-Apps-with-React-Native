export default class LocalDatabase {
	constructor(updateState) {
		this.todos = [];
		this.todoId = this.todos.length;
		this.updateState = updateState;

		this.readStorage();
	}

	initialise(todos) {
		console.log(todos);
		this.todos = todos;
		this.todoId = todos.length;
		this.updateState(this.read());
	}

	async readStorage() {
	}

	async itemUpdated(networkMode, item) {
		this.updateState(this.read());
	}

	findIndex(id) {
		return this.todos.map(todo => todo.todoId).indexOf(id);
	}

	create(item) {
		let itemDup = {
			...item,
			todoId: ++this.todoId,
		};

		this.todos.push(itemDup);
		this.itemUpdated('create', item);
	}

	read(hideCompleted=false, search='') {
		if (hideCompleted) {
			return this.todos.filter(todo => !todo.complete && todo.txt.indexOf(search) != -1);
		} else {
			return this.todos.filter(todo => todo.txt.indexOf(search) != -1);
		}
	}

	update(item) {
		this.todos[this.findIndex(item.todoId)] = item;
		this.itemUpdated('update', item);
	}

	delete(item) {
		this.todos.splice(this.findIndex(item.todoId), 1);
		this.itemUpdated('delete', item);
	}
}