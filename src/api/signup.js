import apiCall from './apiRequest';
import endPoints from './endPoints';

export function signup({ payload }) {
  return apiCall({
    method: 'post',
    endpoint: `${endPoints.signup}`,
    payload
  });
}

export default {
  signup,
};
