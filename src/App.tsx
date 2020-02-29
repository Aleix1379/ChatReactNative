import {createStore} from 'redux';
import {rootReducer} from './store/root-reducer';
import {Provider} from 'react-redux';
import React from 'react';
import RootNav from './navigator';

const App = () => {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <RootNav />
    </Provider>
  );
};

export default App;
