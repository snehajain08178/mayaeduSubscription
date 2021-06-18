import {
  FETCH_USER_DETAILS_START,
  FETCH_USER_DETAILS_END,
  ERROR_USER_DETAILS,
} from '../constants/userDetails';
import {
  fetchUserDetails as fetchUserDetailsApi,
} from '../../api/userDetails';

import { notify } from './notification';

export function fetchUserDetailsStart() {
  return ({ type: FETCH_USER_DETAILS_START });
}

export function fetchUserDetailsEnd(payload = {}) {
  return ({ type: FETCH_USER_DETAILS_END, payload });
}

export function raiseErrorFetchUserDetails() {
  return ({ type: ERROR_USER_DETAILS });
}

export function fetchUserDetails(query) {
  return (dispatch) => {
    dispatch(fetchUserDetailsStart());
    fetchUserDetailsApi({ query })
      .then((res) => {
        dispatch(fetchUserDetailsEnd(res.body));
      })
      .catch((error) => {
        dispatch(notify(error));
        dispatch(raiseErrorFetchUserDetails());
      });
  };
}
