import {createStore} from 'redux';
import {rootReducer} from './store/root-reducer';
import {Provider} from 'react-redux';
import React from 'react';
import App from './App';

const AppWrapper = () => {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
