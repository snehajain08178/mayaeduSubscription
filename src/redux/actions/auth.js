import {
  login as loginApi
} from '../../api/login';

import { notify } from './notification';

import {
  LOGIN_USER_START,
  ERROR_USER_LOGIN,
  LOGIN_USER_END,
  LOGOUT_USER,
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

export function signUpUser(payload = {}, callBack) {
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

// Logout /Clear Profile
export const logoutUser = (callBack) => (dispatch) => {
  callBack();
  dispatch({ type: LOGOUT_USER });
  dispatch(notify({ message: 'You logout sucessfully', isError: false }));
};
