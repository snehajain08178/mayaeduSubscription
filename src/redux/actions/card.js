import {
  FETCH_CARD_START,
  FETCH_CARD_END,
  ERROR_CARD,
} from '../constants/card';
import {
  fetchCard as fetchCardApi,
} from '../../api/card';

import { notify } from './notification';

export function fetchCardStart() {
  return ({ type: FETCH_CARD_START });
}

export function fetchCardEnd(payload = {}) {
  return ({ type: FETCH_CARD_END, payload });
}

export function raiseErrorFetchCard() {
  return ({ type: ERROR_CARD });
}

export function fetchCard(query) {
  return (dispatch) => {
    dispatch(fetchCardStart());
    fetchCardApi({ query })
      .then((res) => {
        dispatch(fetchCardEnd(res.body));
      })
      .catch((error) => {
        dispatch(notify(error));
        dispatch(raiseErrorFetchCard());
      });
  };
}
