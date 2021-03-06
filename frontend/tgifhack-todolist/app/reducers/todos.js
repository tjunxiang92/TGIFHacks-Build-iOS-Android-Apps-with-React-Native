import {
  ADD_TODO,
  UPDATE_TODO,
  TOGGLE_COMPLETE,
  UPDATE_SEARCH,
  DELETE_TODO,
  SAVE_TODOS_ERROR,
  FETCH_TODOS_RESULT,
  FETCH_TODOS_ERROR,
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
    case FETCH_TODOS_RESULT:
      return {
        ...state,
        todos: action.todos,
        currentId: action.todos[action.todos.length - 1].todoId + 1,
      }
    case FETCH_TODOS_ERROR:
      return {
        ...state,
        error: action.error,
      }
    case SAVE_TODOS_ERROR:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state;
  }
};

export default reducer;
