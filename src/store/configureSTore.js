import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import places from './reducers/places';
import ui from './reducers/ui';
import auth from './reducers/auth';

const rootReducer = combineReducers({
  places,
  ui,
  auth
});

let composeEnhancers = compose;

if(__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;