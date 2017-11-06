export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';

export const addTodo = todo => ({
  type: ADD_TODO,
  todo
});

export const updateTodo = todo => ({
  type: UPDATE_TODO,
  todo,
});

export const deleteTodo = todo => ({
  type: DELETE_TODO,
  todo,
});

export const updateSearch = search => ({
  type: UPDATE_SEARCH,
  search,
});

export const toggleComplete = () => ({
  type: TOGGLE_COMPLETE,
})
