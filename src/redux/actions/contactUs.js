import { notify } from './notification';
import {
  SAVE_CONTACT_US_START,
  SAVE_CONTACT_US_END,
  ERROR_CONTACT_US_SAVE,
} from '../constants/contactUs';
import {
  saveContactUs as saveContactUsApi,
} from '../../api/contactUs';

export function saveContactUsStart() {
  return ({ type: SAVE_CONTACT_US_START });
}

export function saveContactUsEnd(payload = {}) {
  return ({ type: SAVE_CONTACT_US_END, payload });
}

export function raiseErrorContactUsSave() {
  return ({ type: ERROR_CONTACT_US_SAVE });
}

export function saveContactUs(payload, callBack) {
  return (dispatch) => {
    dispatch(saveContactUsStart());
    saveContactUsApi({ payload })
      .then((res = {}) => {
        dispatch(saveContactUsEnd(res.body));
        dispatch(notify({
          isError: false,
          message: 'Contact data saved successfully'
        }));
        callBack();
      })
      .catch((error = {}) => {
        dispatch(notify(error));
        dispatch(raiseErrorContactUsSave());
      });
  };
}
