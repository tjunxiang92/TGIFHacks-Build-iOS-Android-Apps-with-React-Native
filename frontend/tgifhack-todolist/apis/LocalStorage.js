import {
	AsyncStorage
} from 'react-native';

import LocalDatabase from './LocalDatabase';

export default class LocalPersistent extends LocalDatabase {
	constructor(updateState) {
		super(updateState);
	}

	// Overriding Methods
	async readStorage() {
		try {
			this.initialise(await this.readLocalStorage());
		} catch (err) {
			console.log(err);
		}
	}

	async itemUpdated(networkMode, item) {
		console.log("Write to Storage");
		this.writeLocalStorage(this.todos);
		this.updateState(this.read());
	}


	// Persistent Storage Calls
	async writeLocalStorage(todos) { 
		try {
			console.log("Write");
			console.log(JSON.stringify(todos))
		  	return await AsyncStorage.setItem('@Todos:list', JSON.stringify(todos));
		} catch (error) {
			console.log(error);
		}
	}

	async readLocalStorage(todos) {
		try {
		  const value = await AsyncStorage.getItem('@Todos:list');
		  if (value !== null){
		    console.log("Read");
		    console.log(value);
		    return JSON.parse(value);
		  }
		} catch (error) {
		  console.log(error);
		  return [];
		}
	}
}