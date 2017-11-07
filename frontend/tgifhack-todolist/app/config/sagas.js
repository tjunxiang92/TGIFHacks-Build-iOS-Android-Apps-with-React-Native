// call(function, params) - Used for calling generators
// select(state => state.xxx) - Used to fetch data from state
// put({ type: ..., }) - Same as this.dispatch(...)
import { AsyncStorage } from 'react-native';
import { takeEvery, call, put, select } from 'redux-saga/effects';

import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  GET_INITIAL_TODOS,
  FETCH_TODOS_RESULT,
  FETCH_TODOS_ERROR,
  SAVE_TODOS_ERROR,
} from '../actions/todos';

// const getLatestTodos = () => fetch('https://google.com');
//
// const fetchLatestTodos = function* (action) {
//   try {
//     const resp = yield call(getLatestTodos);
//     const result = yield resp.json();
//     if (result.error) {
//       yield put({ type: FETCH_TODOS_ERROR, error: result.error });
//     } else {
//       yield put({ type: FETCH_TODOS_RESULT, result });
//     }
//   } catch (err) {
//     yield put({ type: FETCH_TODOS_ERROR, error: err.message });
//   }
// }

const getLatestTodos = () => AsyncStorage.getItem('completeStore');

const fetchLatestTodos = function* fetchLatestTodos(action) {
  try {
    const resp = yield call(getLatestTodos);
    const result = yield JSON.parse(resp);
    if (result) {
      yield put({ type: FETCH_TODOS_RESULT, todos: result.todos });
    }
  } catch (err) {
    yield put({ type: FETCH_TODOS_ERROR, error: err.message });
  }
}

const saveTodosToStorage = todos => AsyncStorage.setItem('completeStore', JSON.stringify(todos));

const saveTodos = function* saveTodos(action) {
  try {
    const todos = yield select(state => state.todos);
    yield call(saveTodosToStorage, todos);
  } catch (err) {
    yield put({ type: SAVE_TODOS_ERROR, error: err.message });
  }
}

const rootSaga = function* rootSaga() {
  yield takeEvery(GET_INITIAL_TODOS, fetchLatestTodos);
  yield takeEvery(ADD_TODO, saveTodos);
  yield takeEvery(UPDATE_TODO, saveTodos);
  yield takeEvery(DELETE_TODO, saveTodos);
}

export default rootSaga;
