import {
  FETCH_SUBSCRIPTION_START,
  FETCH_SUBSCRIPTION_END,
  ERROR_SUBSCRIPTION,
} from '../constants/subscription';
import {
  fetchSubscriptionDetails as fetchSubscriptionApi,
} from '../../api/subscription';

import { notify } from './notification';

export function fetchSubscriptionStart() {
  return ({ type: FETCH_SUBSCRIPTION_START });
}

export function fetchSubscriptionEnd(payload = {}) {
  return ({ type: FETCH_SUBSCRIPTION_END, payload });
}

export function raiseErrorFetchSubscription() {
  return ({ type: ERROR_SUBSCRIPTION });
}

export function fetchSubscription(query) {
  return (dispatch) => {
    dispatch(fetchSubscriptionStart());
    fetchSubscriptionApi({ query })
      .then((res) => {
        dispatch(fetchSubscriptionEnd(res.body));
      })
      .catch((error) => {
        dispatch(notify(error));
        dispatch(raiseErrorFetchSubscription());
      });
  };
}
