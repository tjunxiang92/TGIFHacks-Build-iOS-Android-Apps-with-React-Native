import LocalDatabase from './LocalDatabase';

const address = 'https://2fc2398d.ngrok.io/todos';

export default class NetworkStorage extends LocalDatabase {
	constructor(updateState) {
		super(updateState);
	}

	// Overriding Methods
	async readStorage() {
		try {
			const data = await fetch(address);
			this.initialise(await data.json());
		} catch (err) {
			console.log(err);
		}
	}

	async itemUpdated(networkMode, item) {
		if (networkMode === 'create') {
			this.todo = await this.createTodo(item);
		} else if (networkMode === 'update') {
			this.todo = await this.updateTodo(item);
		} else if (networkMode === 'delete') {
			this.todo = await this.deleteTodo(item);
		}

		this.updateState(this.read());
	}

	// Network Calls
	async createTodo(item) {
		try {
			const data = await fetch(address, {
			  method: 'POST',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(item)
			});
			return await data.json();
		} catch (err) {
			console.log(err);
		}
	}

	async updateTodo(item) {
		try {
			const data = await fetch(address, {
			  method: 'PATCH',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(item)
			});
			return await data.json();
		} catch (err) {
			console.log(err);
		}
	}

	async deleteTodo(item) {
		try {
			const data = await fetch(address, {
			  method: 'DELETE',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(item)
			});
			return await data.json();
		} catch (err) {
			console.log(err);
		}
	}
}