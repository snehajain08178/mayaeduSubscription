import {
  FETCH_SUBSCRIPTION_START,
  FETCH_SUBSCRIPTION_END,
  ERROR_SUBSCRIPTION,
} from '../constants/subscription';

export const initialState = {
  isFetching: false,
  info: {},
  isError: false,
};

const REDUCER_HANDLERS = {
  [FETCH_SUBSCRIPTION_START]: (state) => ({
    ...state,
    isFetching: true,
    isError: false,
  }),
  [ERROR_SUBSCRIPTION]: (state) => ({
    ...state,
    isFetching: false,
    isError: true,
  }),
  [FETCH_SUBSCRIPTION_END]: (state, action) => ({
    ...state,
    isFetching: false,
    info: action.payload,
  }),
};

export default function subscriptionReducer(state = initialState, action = {}) {
  const handler = REDUCER_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
