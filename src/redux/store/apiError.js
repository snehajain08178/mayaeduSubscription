import { logoutUser } from '../actions/auth';
import { notify } from '../actions/notification';
import { API_ERROR_INVALID_TOKEN } from './constants';

export const apiError = ({ dispatch }) => (next) => (action) => {
  if (action.type === API_ERROR_INVALID_TOKEN) {
    dispatch(logoutUser({ isDispatch: true, isInvokeApi: false }));
    dispatch(notify(action.payload));
  } else {
    next(action);
  }
};

export default {
  apiError,
};
