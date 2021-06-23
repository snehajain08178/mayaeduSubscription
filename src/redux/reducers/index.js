import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './auth';
import notification from './notification';
import userDetails from './userDetails';
import subscriptionDetails from './subscription';
import card from './card';
import plans from './plans';

export default function createReducer(history) {
  const reducer = combineReducers({
    router: connectRouter(history),
    auth,
    notification,
    userDetails,
    subscriptionDetails,
    card,
    plans,
  });
  return (state, action) => reducer(action.type === 'LOGOUT_USER' ? undefined : state, action);
}
