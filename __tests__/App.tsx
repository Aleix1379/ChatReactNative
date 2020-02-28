/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {rootReducer} from '../src/store/root-reducer';

describe('With React Testing Library', () => {
  const store = createStore(rootReducer);

  it('renders correctly', () => {
    renderer.create(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });
});
