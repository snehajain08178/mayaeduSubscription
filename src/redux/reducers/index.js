import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './auth';
import notification from './notification';

export default function createReducer(history) {
  const reducer = combineReducers({
    router: connectRouter(history),
    auth,
    notification,
  });
  return reducer;
}
