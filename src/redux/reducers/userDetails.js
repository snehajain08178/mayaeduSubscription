import {
  FETCH_USER_DETAILS_START,
  FETCH_USER_DETAILS_END,
  ERROR_USER_DETAILS,
} from '../constants/userDetails';

export const initialState = {
  isFetching: false,
  info: {},
  isError: false,
};

const REDUCER_HANDLERS = {
  [FETCH_USER_DETAILS_START]: (state) => ({
    ...state,
    isFetching: true,
    isError: false,
  }),
  [ERROR_USER_DETAILS]: (state) => ({
    ...state,
    isFetching: false,
    isError: true,
  }),
  [FETCH_USER_DETAILS_END]: (state, action) => ({
    ...state,
    isFetching: false,
    info: action.payload,
  }),
};

export default function userDetailsReducer(state = initialState, action = {}) {
  const handler = REDUCER_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
