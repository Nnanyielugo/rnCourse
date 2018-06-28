import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './src/store/configureSTore';

const store = configureStore();
// since appregistry.register component expects a function rather than a component,
// turn RNRedux into a function that returns jsx
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
)
AppRegistry.registerComponent('course', () => RNRedux);
