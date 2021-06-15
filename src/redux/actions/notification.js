import { PUSH_NOTIFICATION, REMOVE_NOTIFICATION, RESET_NOTIFICATIONS } from '../constants/notification';

export function pushNotification(payload) {
  return ({
    type: PUSH_NOTIFICATION,
    payload,
  });
}

export function resetNotifications() {
  return ({
    type: RESET_NOTIFICATIONS,
  });
}

export function notify(payload) {
  return (dispatch) => {
    dispatch(pushNotification(payload));
  };
}

export function closeNotification(key) {
  return {
    type: REMOVE_NOTIFICATION,
    payload: { key },
  };
}
