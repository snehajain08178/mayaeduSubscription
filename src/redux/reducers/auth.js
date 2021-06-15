// ------------------------------------
// Imports
// ------------------------------------
import {
  LOGIN_USER_START,
  ERROR_USER_LOGIN,
  LOGIN_USER_END,
  LOGOUT_USER,
} from '../constants/auth';

// ------------------------------------
// Reducer Handlers
// ------------------------------------
export const initialState = {
  isProcessing: false,
  isError: false,
  info: {},
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER_START:
      return {
        ...initialState,
        isProcessing: true,
      };
    case LOGIN_USER_END:
      return {
        ...state,
        ...payload,
        isProcessing: false,
      };
    case ERROR_USER_LOGIN:
    case LOGOUT_USER:
      localStorage.removeItem('AUTH_ACCESS_TOKEN');
      return {
        ...state,
        isProcessing: false,
      };
    default:
      return state;
  }
}
