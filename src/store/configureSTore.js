import { createStore, combineReducers, compose } from 'redux';

import places from './reducers/places';

const rootReducer = combineReducers({
  places
});

let composeEnhancers = compose;

if(__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer,   composeEnhancers())
};

export default configureStore;