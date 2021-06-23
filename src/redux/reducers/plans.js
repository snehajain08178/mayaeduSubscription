import {
  FETCH_PLANS_START,
  FETCH_PLANS_END,
  ERROR_PLANS,
} from '../constants/plans';

export const initialState = {
  isFetching: false,
  info: {},
  isError: false,
};

const REDUCER_HANDLERS = {
  [FETCH_PLANS_START]: (state) => ({
    ...state,
    isFetching: true,
    isError: false,
  }),
  [ERROR_PLANS]: (state) => ({
    ...state,
    isFetching: false,
    isError: true,
  }),
  [FETCH_PLANS_END]: (state, action) => ({
    ...state,
    isFetching: false,
    info: action.payload,
  }),
};

export default function plansReducer(state = initialState, action = {}) {
  const handler = REDUCER_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
