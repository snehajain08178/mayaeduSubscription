import { createStore, applyMiddleware, compose } from 'redux';
import createReducer from 'redux/reducers';
import thunk from 'redux-thunk';
import config from 'config';
import { setReduxStoreRef } from '../../helpers/reduxStore';
import { apiError } from './apiError';

/**
 * @description This is redux store, middleware and devtools are used consumed here
 */

const { DEV_TOOLS } = config;
const middleware = [thunk, apiError];

let composeEnhancer = compose;

if (DEV_TOOLS && DEV_TOOLS.enableReduxDevTools) {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
}

export default function initStore(initialState = {}, history) {
  const store = createStore(
    createReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(...middleware))
  );
  setReduxStoreRef(store);
  return store;
}
