import { PUSH_NOTIFICATION, REMOVE_NOTIFICATION, RESET_NOTIFICATIONS } from '../constants/notification';

const initialState = {
  messages: {},
  isReset: false,
  isError: false,
};

const REDUCER_HANDLERS = {
  [PUSH_NOTIFICATION]: (state, { payload = {} }) => {
    const messageKey = payload.code || 'default';
    const { message, isError } = payload;
    const updatedState = {
      messages: { message, isError, messageKey },
      isReset: false,
      isError: true,
    };
    return updatedState;
  },
  [REMOVE_NOTIFICATION]: (state, { payload }) => {
    const { messages } = state;
    delete messages[payload.key];
    return { messages: { ...messages }, isReset: false };
  },
  [RESET_NOTIFICATIONS]: () => ({ isReset: true, messages: {} }),
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function notifyReducer(state = initialState, action = {}) {
  const handler = REDUCER_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
