// ------------------------------------
// Imports
// ------------------------------------
import {
  SAVE_CONTACT_US_START,
  SAVE_CONTACT_US_END,
  ERROR_CONTACT_US_SAVE,
} from '../constants/contactUs';

// ------------------------------------
// Reducer Handlers
// ------------------------------------
export const initialState = {
  isProcessing: false,
  isError: false,
  info: null,
};

const REDUCER_HANDLERS = {
  [SAVE_CONTACT_US_START]: (state) => (
    { ...state, isProcessing: true }
  ),
  [ERROR_CONTACT_US_SAVE]: (state) => (
    { ...state, isError: true, isProcessing: false }
  ),
  [SAVE_CONTACT_US_END]: (state, action) => (
    {
      ...state,
      isProcessing: false,
      isError: false,
      info: action.payload,
    }
  ),
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function contactUsReducer(state = initialState, action = {}) {
  const handler = REDUCER_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
