import {
  FETCH_CARD_START,
  FETCH_CARD_END,
  ERROR_CARD,
} from '../constants/card';

export const initialState = {
  isFetching: false,
  info: {},
  isError: false,
};

const REDUCER_HANDLERS = {
  [FETCH_CARD_START]: (state) => ({
    ...state,
    isFetching: true,
    isError: false,
  }),
  [ERROR_CARD]: (state) => ({
    ...state,
    isFetching: false,
    isError: true,
  }),
  [FETCH_CARD_END]: (state, action) => ({
    ...state,
    isFetching: false,
    info: action.payload,
  }),
};

export default function cardReducer(state = initialState, action = {}) {
  const handler = REDUCER_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
