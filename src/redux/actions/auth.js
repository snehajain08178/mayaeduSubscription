import {
  login as loginApi,
} from '../../api/login';
import history from '../../libs/history';

import {
  signup as signupApi
} from '../../api/signup';

import { notify } from './notification';

import {
  LOGIN_USER_START,
  ERROR_USER_LOGIN,
  LOGIN_USER_END,
  LOGOUT_USER,
  SIGNUP_USER_START,
  SIGNUP_USER_END,
  ERROR_USER_SIGNUP
} from '../constants/auth';

export function loginUserStart() {
  return ({ type: LOGIN_USER_START });
}

export function loginUserEnd(payload = {}) {
  return ({ type: LOGIN_USER_END, payload });
}

export function raiseErrorLoginUser() {
  return ({ type: ERROR_USER_LOGIN });
}

export function loginUser(payload = {}, callBack) {
  return (dispatch) => {
    dispatch(loginUserStart());
    loginApi({ payload })
      .then((res = {}) => {
        dispatch(loginUserEnd(res.header.authorization));
        localStorage.setItem('AUTH_ACCESS_TOKEN', res.header.authorization);
        callBack();
      })
      .catch((error) => {
        dispatch(notify(error));
        dispatch(raiseErrorLoginUser());
      });
  };
}

/**
 * Signup
 */

export function signupUserStart() {
  return ({ type: SIGNUP_USER_START });
}

export function signupUserEnd(payload = {}) {
  return ({ type: SIGNUP_USER_END, payload });
}

export function raiseErrorSignupUser() {
  return ({ type: ERROR_USER_SIGNUP });
}

export function signUpUser(payload = {}, callBack) {
  const data = payload;
  if (!payload.mobileNumber) {
    delete data.mobileNumber;
  }
  return (dispatch) => {
    dispatch(signupUserStart());
    signupApi(data)
      .then((res = {}) => {
        localStorage.setItem('AUTH_ACCESS_TOKEN', res.header.authorization);
        dispatch(signupUserEnd(res.body));
        callBack();
      })
      .catch((error) => {
        dispatch(notify(error));
        dispatch(raiseErrorSignupUser());
      });
  };
}

// Logout /Clear Profile
export const logoutUser = () => (dispatch) => {
  history.push('/');
  dispatch({ type: LOGOUT_USER });
  dispatch(notify({ message: 'You logout sucessfully', isError: false }));
};
