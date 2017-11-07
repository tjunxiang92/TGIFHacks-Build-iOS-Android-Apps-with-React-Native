import React from 'react';
import { Provider } from 'react-redux';

import Navigator from './app/config/routes';
import store from './app/config/store';

export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);
