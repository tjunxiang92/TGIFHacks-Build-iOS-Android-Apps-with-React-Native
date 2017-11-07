export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
export const GET_INITIAL_TODOS = 'GET_INITIAL_TODOS';

export const FETCH_TODOS_RESULT = 'FETCH_TODOS_RESULT';
export const FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR';

export const SAVE_TODOS_ERROR = 'SAVE_TODOS_ERROR';

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

export const getInitialTodos = todos => ({
  type: GET_INITIAL_TODOS,
  todos,
});
