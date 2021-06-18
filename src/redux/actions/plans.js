import {
  FETCH_PLANS_START,
  FETCH_PLANS_END,
  ERROR_PLANS,
} from '../constants/plans';
import {
  fetchPlans as fetchPlansApi,
} from '../../api/plans';

import { notify } from './notification';

export function fetchPlansStart() {
  return ({ type: FETCH_PLANS_START });
}

export function fetchPlansEnd(payload = {}) {
  return ({ type: FETCH_PLANS_END, payload });
}

export function raiseErrorFetchPlans() {
  return ({ type: ERROR_PLANS });
}

export function fetchPlans(query) {
  return (dispatch) => {
    dispatch(fetchPlansStart());
    fetchPlansApi({ query })
      .then((res) => {
        dispatch(fetchPlansEnd(res.body));
      })
      .catch((error) => {
        dispatch(notify(error));
        dispatch(raiseErrorFetchPlans());
      });
  };
}
