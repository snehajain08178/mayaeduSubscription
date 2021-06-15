import apiCall from './apiRequest';
import endPoints from './endPoints';

export function signup({ payload }) {
  return apiCall({
    method: 'post',
    endpoint: `${endPoints.singup}`,
    payload
  });
}

export default {
  signup,
};
