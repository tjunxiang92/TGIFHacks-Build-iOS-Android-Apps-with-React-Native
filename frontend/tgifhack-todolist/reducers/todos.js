import {
  ADD_TODO,
  UPDATE_TODO,
  TOGGLE_COMPLETE,
  UPDATE_SEARCH,
  DELETE_TODO,
} from '../actions/todos';

const initialState = {
  todos: [{
    todoId: 1,
    txt: 'Helloworld',
    complete: false,
  },
  {
    todoId: 2,
    txt: 'Hellworld 2',
    complete: true,
  },
  {
    todoId: 3,
    txt: 'Helloworld 3',
    complete: false,
  }],
  currentId: 4,
  hide: false,
  loading: false,
  search: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: state.todos.concat({ ...action.todo, todoId: state.currentId }),
        currentId: state.currentId + 1,
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => (todo.todoId === action.todo.todoId ? action.todo : todo)),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.todoId !== action.todo.todoId),
      };
    case TOGGLE_COMPLETE:
      return {
        ...state,
        hide: !state.hide,
      };
    case UPDATE_SEARCH:
      return {
        ...state,
        search: action.search,
      };
    default:
      return state;
  }
};

export default reducer;
