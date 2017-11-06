import { combineReducers } from 'redux';

import nav from './nav';
import todos from './todos';

export default combineReducers({
  nav,
  todos,
});
