// ------------------------------------
// Imports
// ------------------------------------
import {
  LOGIN_USER_START,
  ERROR_USER_LOGIN,
  LOGIN_USER_END,
  LOGOUT_USER,
  SIGNUP_USER_START,
  SIGNUP_USER_END,
  ERROR_USER_SIGNUP
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
    case SIGNUP_USER_START:
      return {
        ...initialState,
        isProcessing: false,
        isError: true,
      };
    case SIGNUP_USER_END:
      return {
        ...state,
        ...payload,
        isProcessing: false,
      };
    case ERROR_USER_SIGNUP:
      return {
        ...state,
        isProcessing: false,
        isError: true,
      };
    case LOGOUT_USER:
      localStorage.removeItem('AUTH_ACCESS_TOKEN');
      localStorage.removeItem('STRIPE_PUBLIC_KEY');
      return {
        ...state,
        isProcessing: false,
      };
    default:
      return state;
  }
}
